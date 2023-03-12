# Python

FROM python:3.11.2 as base

WORKDIR /app

ENV PYTHONUNBUFFERED=true

# Poetry

FROM base as poetry

WORKDIR /app

ENV POETRY_HOME=/opt/poetry
ENV POETRY_VIRTUALENVS_IN_PROJECT=true
ENV PATH="$POETRY_HOME/bin:$PATH"

RUN curl -sSL https://install.python-poetry.org | python -

COPY . ./

RUN poetry install --no-interaction --no-ansi -vvv

# Runtime

FROM python as runtime

WORKDIR /app

ENV PATH="/app/.venv/bin:$PATH"

COPY --from=poetry /app /app

EXPOSE 8000

CMD uvicorn timeboxx.main:app --host 0.0.0.0
