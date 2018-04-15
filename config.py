# -*- coding:utf-8 -*-

# 项目信息及服务器信息配置文件
import os

current_path = os.path.dirname(__file__)

####################Application配置##########################
settings = {
    "static_path": os.path.join(current_path, "static"),
    "template_path": os.path.join(current_path, "template")
}


####################mysql配置##########################
mysql_config = {
    "host": "192.168.11.83",
    "database": "meici",
    "user": "root",
    "password": "960226",
    "port": 3306,
    "charset": "utf8"
}


####################redis配置##########################
redis_config = {
    "host": "127.0.0.1",
    "port": 6379
}


####################logging配置配置##########################
log_level = "debug"
log_file = os.path.join(current_path, "logs/log")
