v1 版本，实现的是单文件项目开发

v2 版本，在第一个版本的基础上
    实现路由信息的配置化
    实现项目信息及服务器信息的配置化


v3 版本，拆分Handler
    实际项目开发中，根据用户发送的不同的请求，会交给不同Handler处理
    项目中，会出现大量的Handler，此时~
    问题1：一个文件中，出现大量Handler和其他代码的混合
    问题2：不同的Handler中，出现了大量的代码重复

    在这个版本中，我们要将Handler拆分进行独立管理
    解决方案1：单独拆分一个python模块文件，管理所有的Handler
    解决方案2：单独拆分一个包，在包中管理所有的Handler
