# -*- coding:utf-8 -*-

class order(object):
    """
    用于封装用户数据的类型
    """
    __slots__ = ["__id", "__goods_id","__user_id","__count","__subtoal"]
    def __init__(self,*args):
        self.__id = args[0][0]
        self.__goods_id = args[0][1]
        self.__user_id = args[0][2]
        self.__count = args[0][3]
        self.__subtoal = args[0][4]

    def get_id(self):
        return self.__id
    def set_id(self):
        self.__id = id

    def get_goods_id(self):
        return self.__goods_id
    def set_goods_id(self,goods_id):
        self.__goods_id = goods_id

    def get_user_id(self):
        return self.__user_id
    def set_user_id(self,user_id):
        self.__user_id = user_id

    def get_count(self):
        return self.__count
    def set_count(self,count):
        self.__count = count

    def get_subtoal(self):
        return self.__subtoal
    def set_subtoal(self,subtoal):
        self.__subtoal = subtoal


    def __repr__(self):
        return "{'order_id':"+str(self.__id)+",'goods_id:'"+str(self.__goods_id)+",'user_id:'"+str(self.__user_id)+",\
        'count:'"+str(self.__count)+",'subtoal:'"+str(self.__subtoal)+"}"




