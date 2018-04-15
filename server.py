# -*- coding:utf-8 -*-

from tornado.web import RequestHandler
from tornado.ioloop import IOLoop
from tornado.httpserver import HTTPServer
from tornado.options import options, define

import tornado.web
import os
import pymysql
import redis
import urls
import config
import logging
import sys
reload(sys)
sys.setdefaultencoding( "utf-8" )
# 定义变量
define("port_2", default=8888, type=int)


# 重写Application处理类
class Application(tornado.web.Application):
    def __init__(self):
        # 初始化父类数据
        super(Application, self).__init__(urls.handlers, **config.settings)
        # 添加物理数据库访问对象
        self.db = pymysql.connect(**config.mysql_config)
        # 添加缓存数据库的访问对象
        self.redis = redis.StrictRedis(**config.redis_config)



if __name__ == "__main__":
    current_path = os.path.dirname(__file__)
    # 日志级别
    options.logging = config.log_level
    # 保存日志的文件
    options.log_file_prefix = config.log_file
    options.parse_command_line()

    # 创建Application服务应用，添加服务器配置
    app = Application()

    # 绑定端口，启动进程
    http_server = HTTPServer(app)
    http_server.bind(options.port_2)
    http_server.start(1)

    # 轮询遍历，监听端口
    IOLoop.current().start()
