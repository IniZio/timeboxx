import json
from functools import cache
from string import Template

from dependency_injector.wiring import Provide, inject
from fastapi import APIRouter, Depends
from fastapi.responses import HTMLResponse

from timeboxx.container import Container
from timeboxx.pkg.config import WebsiteSettings

router = APIRouter()


@router.get("/")
def website(request, exc):
    return HTMLResponse(get_index_html(), media_type="text/html")


@cache
@inject
def get_index_html(
    website_settings: WebsiteSettings = Depends(Provide[Container.website_settings]),
):
    index_html_file = open("timeboxx/public/index.html", "rb")
    index_html = index_html_file.read()
    index_html_file.close()

    website_settings_json_str = json.dumps(website_settings.dict())
    rendered = Template(index_html.decode()).safe_substitute(
        website_config=website_settings_json_str
    )
    return rendered
