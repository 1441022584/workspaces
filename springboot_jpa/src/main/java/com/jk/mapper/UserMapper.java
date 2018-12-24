/**
 * Copyright (C),2018
 * FileName: 段国强
 * Author:   admin
 * Date:     2018/12/21 19:36
 * Description: 这是接口
 * History:
 */
package com.jk.mapper;

import com.jk.model.UserBean;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * 〈一句话功能简述〉<br> 
 * 〈这是接口〉
 *
 * @author admin
 * @create 2018/12/21
 * @since 1.0.0
 */
@Repository
public interface UserMapper extends JpaRepository<UserBean,Integer> {





}
