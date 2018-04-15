# -*- coding:utf-8 -*-

from . import BaseHandler
import re
from models import News


import logging
import json

class shopingHandler(BaseHandler.BaseHandler):
    def get(self):
        print 'ok'
        # present_sku={"img_url":"https://img3.meicicdn.com/u/LvProduct/pic/20170828/11582059a394dc4fbc0-200x240.jpg","brand_ename":"","brand_name":"","name":""}
        present_sku=['https://img3.meicicdn.com/u/LvProduct/pic/20170828/11582059a394dc4fbc0-200x240.jpg','na','na','ma']
        present_sku=News.Newslist(present_sku)
        self.render('none_ordergoods.html',present_sku=present_sku)

class persongoodsHandler(BaseHandler.BaseHandler):
    def get(self):
        present_sku = ['https://img3.meicicdn.com/u/LvProduct/pic/20170828/11582059a394dc4fbc0-200x240.jpg', 'na', 'na',
                       'ma']
        present_sku = News.Newslist(present_sku)
        self.render('persongoods.html',present_sku=present_sku)

class Ordershopping(BaseHandler.BaseHandler):

    def get(self):
        set = self.get_argument('id')

        rows,all=self.query('select * from orders where id=%s',[set])

