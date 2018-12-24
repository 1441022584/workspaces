/**
 * Copyright (C),2018
 * FileName: UserController
 * Author:   admin
 * Date:     2018/12/21 18:34
 * Description: 这是控制层
 * History:
 */
package com.jk.controller;

import com.jk.model.UserBean;
import com.jk.service.UserService;
import com.jk.utils.FileUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

/**
 * 〈一句话功能简述〉<br> 
 * 〈这是控制层〉
 *
 * @author 段国强
 * @create 2018/12/21
 * @since 1.0.0
 */
@Controller
@RequestMapping("user")
public class UserController {


    @Autowired
    private UserService userService;

    // 跳转页面
    @RequestMapping("toMain")
    public  String toMain(){

        return "main";
    }

    //  查询
    @RequestMapping("getUserList")
    @ResponseBody
    public List<UserBean> getUserList(){
        List<UserBean>  list = userService.getUserList();
        System.out.println(list);
        return list;
    }


    // 新增
    @RequestMapping("addUser")
    @ResponseBody
    public  Boolean addUser(UserBean userBean){

        try {
            userService.addUser(userBean);
            return true;
        } catch (Exception e) {
            // TODO: handle exception
            return false;
        }
    }

    // 图片
    @RequestMapping("upload")
    @ResponseBody
    public String upload(HttpServletRequest request
            , @RequestParam(value="picFile",required=false) MultipartFile file){
        String path = FileUtil.FileUpload(file, request);
        if(path.contains("null")) {
            return null;
        }else {
            return path;
        }
    }

    // 删除
    @RequestMapping("deleteUserAll")
    @ResponseBody
    public Boolean deleteUserAll(Integer[] ids){

        try {
                userService.deleteUserAll(ids);
            return true;
        } catch (Exception e) {
            // TODO: handle exception
            return false;
        }
    }

}
