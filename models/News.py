# -*- coding:utf-8 -*-


class News(object):
    """
    用于封装用户数据的类型
    """
    __slots__ = ["__id", "__title1","__data","__people","__time","__myimg"]
    def __init__(self,*args):
        # print args
        self.__id = args[0][0]
        self.__title1 = args[0][1]
        self.__data = args[0][2]
        self.__people =args[0][3]
        self.__time = args[0][4]
        self.__myimg = args[0][5]

    def get_id(self):
        return self.__id

    def set_id(self, id):
        self.__id = id

    def get_title1(self):
        return self.__title1

    def set_title1(self,title1):
        self.__title1=title1

    def get_data(self):
        return self.__data

    def set_data(self,data):
        self.__data=data

    def get_people(self):
        return self.__people

    def set_people(self,people):
        self.__people=people

    def get_time(self):
        return self.__time

    def set_time(self,time):
        self.__time=time

    def get_myimg(self):
        return self.__myimg

    def set_myimg(self,myimg):
        self.__myimg=myimg

    def __repr__(self):
        return "{'id':"+str(self.__id)+",'title1':'"+str(self.__title1.encode('utf-8'))\
               +"','data':'"+str(self.__data.encode('utf-8'))+",'people':'"\
               +str(self.__people.encode('utf-8'))+"','time':'"+str(self.__time.encode('utf-8'))+ "','myimg':'" + str(self.__myimg.encode('utf-8'))+"'}"


class Newslist(object):
    __slots__ = ["__id", "__title1", "__data", "__people", "__time"]

    def __init__(self, *args):
        # print args
        self.__id = args[0][0]
        self.__title1 = args[0][1]
        self.__data = args[0][2]
        self.__people = args[0][3]
        self.__time = args[0][4]

    def get_id(self):
        return self.__id

    def set_id(self, id):
        self.__id = id

    def get_title1(self):
        return self.__title1

    def set_title1(self,title1):
        self.__title1=title1

    def get_data(self):
        return self.__data

    def set_data(self,data):
        self.__data=data

    def get_people(self):
        return self.__people

    def set_people(self,people):
        self.__people=people

    def get_time(self):
        return self.__time

    def set_time(self,time):
        self.__time=time

    def __repr__(self):
        return "{'id':"+str(self.__id)+",'title1':'"+str(self.__title1.encode('utf-8'))\
               +"','people':'"+str(self.__people.encode('utf-8'))+"','time':'"+str(self.__time.encode('utf-8'))+"'}"
