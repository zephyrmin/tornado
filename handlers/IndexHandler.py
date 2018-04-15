# -*- coding:utf-8 -*-

from . import BaseHandler
import re
from models import News


import logging


class IndexHandler(BaseHandler.BaseHandler):
    """
    这是处理系统首页的Handler处理类
    """
    def get(self):
        # 获取主页上要展示的用户信息
        flag = self.get_argument("flag",False)

        newlist = self.redis.get("newlist")
        if newlist is not None:
            # reg = re.compile("\s*")
            # newlist = reg.sub("",newlist)
            newlist = eval(newlist)
        else:
            newlist = []
            print (not flag)
        if (len(newlist)== 0) or flag:
            newlist = []
            print ("缓存中不存在数据，从物理数据库查询")
            rows, result = self.query("SELECT * from news WHERE isdelete=false", None)
            # 将缓存中的数据，转换成对象
            for u in result:
                # 转换好的对象，添加到userlist列表中
                user = News.Newslist(u)
                newlist.append(user)
            else:
                print ("物理数据库查询完成，同步到缓存中....")
                # 将物理数据库中查询到的数据，缓存到redis中
                self.redis.set("newlist", newlist)

            # 查询数据结束
        print "数据查询完成"
        # print newlist
        # self.write("dodo!!!!!!")

        self.render("index.html", news_list=(newlist))

