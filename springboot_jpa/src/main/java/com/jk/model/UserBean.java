/**
 * Copyright (C),2018
 * FileName: 段国强
 * Author:   admin
 * Date:     2018/12/21 19:11
 * Description: 这是实体类
 * History:
 */
package com.jk.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;

/**
 * 〈一句话功能简述〉<br>
 * 〈这是实体类〉
 *
 * @author 段国强
 * @create 2018/12/21
 * @since 1.0.0
 */
@Entity
@Table(name="t_users")
public class UserBean implements Serializable {

    private static final long serialVersionUID = 6508520653008724275L;


    @Id
    @GeneratedValue
    private  Integer  userId;

    private  String   userName;

    private  String   password;

    private  String   img;

    //@Temporal(TemporalType.TIMESTAMP)
    //@DateTimeFormat(pattern = "yyyy-mm-dd")
    @Temporal(TemporalType.DATE)
    @DateTimeFormat(pattern="yyyy-MM-dd")
    @JsonFormat(timezone = "GMT+8", pattern = "yyyy-MM-dd")
    private  Date   time;

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getImg() {
        return img;
    }

    public void setImg(String img) {
        this.img = img;
    }

    public Date getTime() {
        return time;
    }

    public void setTime(Date time) {
        this.time = time;
    }

    @Override
    public String toString() {
        return "UserBean{" +
                "userId=" + userId +
                ", userName='" + userName + '\'' +
                ", password='" + password + '\'' +
                ", img='" + img + '\'' +
                ", time=" + time +
                '}';
    }
}
