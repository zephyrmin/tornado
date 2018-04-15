# -*- coding:utf-8 -*-

from . import BaseHandler
import re
import sys
sys.path.append("..")
from models import Users
import logging


class register_verification(BaseHandler.BaseHandler):
    def get(self):
        self.render('register.html')
    def post(self):
            # 接受用户发送的参数
        self.set_header("access-control-allow-origin","*")
        phone = self.get_argument("phone")
        password = self.get_argument("password")

        print phone,password
        print type(password)
        # 判断账号密码是否正确
        sql = 'select * from user WHERE phone = '+phone
        rows,user = self.query(sql,None)
        print rows,user
        if rows >= 1:
            print "********************"
            result = '{"code":-1, "msg":"the phone exists!"}'
        else:
            sql2 = "select * from user"
            req3,req4=self.query(sql2,None)
            print req3,req4
            print "----------------------"
            sql1 = 'insert into user (phone,userpass) VALUES ('+phone+','+password+')'
            request1,request2=self.query(sql1,None)
            print "=========================="
            print request1,request2
            sql3 = "select * from user"
            req5, req6 = self.query(sql2, None)
            print req5, req6
            print "=========================="
            result = '{"code":0, "msg":"ok!"}'
            # 将信息写到响应中，返回给浏览器
        self.write(result)
