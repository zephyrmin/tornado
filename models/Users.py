# -*- coding:utf-8 -*-


class Users(object):
    """
    用于封装用户数据的类型
    """
    __slots__ = ["__id", "__name","__age"]

    def __init__(self,*args):
        # print args
        self.__id = args[0][0]
        self.__name = args[0][1]
        self.__age = args[0][2]

    def get_id(self):
        return self.__id

    def set_id(self, id):
        self.__id = id

    def get_name(self):
        return self.__name

    def set_name(self,name):
        self.__name=name

    def get_age(self):
        return self.__age

    def set_age(self,age):
        self.__age=age

    def __repr__(self):
        return "{'id':"+str(self.__id)+",'name':'"+str(self.__name.encode('utf-8'))+"','age':"+str(self.__age)+"}"


