# -*- coding:utf-8 -*-

from . import BaseHandler
import re
import sys
sys.path.append("..")
from models import Users
import logging


class login_verification(BaseHandler.BaseHandler):
    def get(self):
        self.render('login.html')
    def post(self):
        # 接受用户发送的参数
        self.set_header('Access-Control-Allow-Origin','*')
        phone = self.get_argument("phone")
        password = self.get_argument("password")
        # 判断账号密码是否正确
        sql = "select * from user WHERE phone =" + phone
        rows,user = self.query(sql,None)
        print rows,user
        if rows == 0:
            result = '{"code":-1, "msg":"username or password is error!"}'
        elif password == user[0][2]:
            result = '{"code":0, "msg":"ok"}'
        else:
            result = '{"code":-1, "msg":"username or password is error!"}'

        # 将信息写到响应中，返回给浏览器
        self.write(result)
