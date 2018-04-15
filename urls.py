# -*- coding:utf-8 -*-

#from server import IndexHandler
from handlers import IndexHandler

# 系统路由信息配置文件
handlers = [
    # IndexHandler<模块文件名称>.IndexHandler<文件中的类型名称>
    (r"/", IndexHandler.IndexHandler),
]