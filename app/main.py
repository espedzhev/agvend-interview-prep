from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from datetime import datetime

from fastapi.params import Body

app = FastAPI()

origins = [
    "http://localhost:4200",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def read_root():
    today = datetime.today()
    long_date = today.strftime("%A, %B %d, %Y")

    return {"message": f"Hello! Today is {long_date}"}


def safe_pairwise_concat(list1: list[str], list2: list[str]) -> list[str]:
    return (
        [a + b for a, b in zip(list1, list2)]
        + list1[len(list2) :]
        + list2[len(list1) :]
    )


@app.post("/concatenate")
async def concatenate(list1: list[str] = Body(...), list2: list[str] = Body(...)):
    if not list1 or not list2:
        return {"result": []}

    return {"result": safe_pairwise_concat(list1, list2)}
