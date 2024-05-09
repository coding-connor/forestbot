from entities.chat.rag_service import RAGService
from fastapi import APIRouter, Depends, HTTPException
from entities.chat.gpt_passthrough_service import GPTPassthroughService
from pydantic_base import CamelMode
from fastapi.responses import StreamingResponse

router = APIRouter()

# TO DO: Replace with setting DI per fastapi best practice https://fastapi.tiangolo.com/advanced/settings/
# the pydantic way noted above seems like the best way
# a current hack until then is: https://pypi.org/project/poetry-dotenv-plugin/


class Message(CamelMode):
    role: str = "user"
    content: str


class RequestBody(CamelMode):
    llm_version: str
    messages: list[Message]


@router.get("")
def hello_world():
    return "Hello, home!"


@router.post("")
async def main(
    body: RequestBody,
    rag_service: RAGService = Depends(RAGService),
    gpt_passthrough_service: GPTPassthroughService = Depends(GPTPassthroughService),
):
    messages = [msg.model_dump() for msg in body.messages]
    try:
        if body.llm_version == "rag-v1":
            # generator = rag_service.get_qa_chain_stream(body.messages[-1].content)
            
            # print('messages', messages)
            generator = rag_service.get_qa_chain_stream(messages)
            # return rag_service.get_qa_chain_stream(body.messages[-1].content)
            # return rag_service.run_qa_chain(body.messages[-1].content)
        else:
            generator = gpt_passthrough_service.get_res_stream(messages)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
    print('generator~~~~~~~~~~~~~', generator)
    return StreamingResponse(generator, media_type="text/event-stream")
    # return 'cats'
