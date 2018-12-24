/**
 * Copyright (C),2018
 * FileName: 段国强
 * Author:   admin
 * Date:     2018/12/21 19:30
 * Description: 这是接口
 * History:
 */
package com.jk.service;

import com.jk.model.UserBean;

import java.util.List;

/**
 * 〈一句话功能简述〉<br> 
 * 〈这是接口〉
 *
 * @author admin
 * @create 2018/12/21
 * @since 1.0.0
 */
public interface UserService {


    // 查询
    List<UserBean> getUserList();


    void addUser(UserBean userBean);


    void deleteUserAll(Integer[] ids);

}
