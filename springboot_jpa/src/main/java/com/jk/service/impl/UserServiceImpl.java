/**
 * Copyright (C),2018
 * FileName: 段国强
 * Author:   admin
 * Date:     2018/12/21 19:32
 * Description: 这是接口实现类
 * History:
 */
package com.jk.service.impl;

import com.jk.mapper.UserMapper;
import com.jk.model.UserBean;
import com.jk.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

/**
 * 〈一句话功能简述〉<br> 
 * 〈这是接口实现类〉
 *
 * @author admin
 * @create 2018/12/21
 * @since 1.0.0
 */
@Service
public class UserServiceImpl implements UserService {


    @Resource
    private UserMapper userMapper;


    @Override
    public List<UserBean> getUserList() {

        return userMapper.findAll();
    }

    @Override
    public void addUser(UserBean userBean) {
        userMapper.save(userBean);
    }

    @Override
    public void deleteUserAll(Integer[] ids) {
        UserBean user =  new UserBean();
        for (int i = 0; i < ids.length; i++) {
            user.setUserId(ids[i]);
            userMapper.delete(user);
        }

    }


}
