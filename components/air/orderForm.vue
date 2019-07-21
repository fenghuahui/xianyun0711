<template>
  <div class="main">
    <!-- 乘机人 -->
    <div class="air-column">
      <h2>乘机人</h2>
      <el-form class="member-info">
        <div class="member-info-item" v-for="(item,index) in users" :key="index">
          <el-form-item label="乘机人类型">
            <el-input placeholder="姓名" class="input-with-select" v-model="users[index].username">
              <el-select slot="prepend" value="1" placeholder="请选择">
                <el-option label="成人" value="1"></el-option>
              </el-select>
            </el-input>
          </el-form-item>

          <el-form-item label="证件类型">
            <el-input placeholder="证件号码" class="input-with-select" v-model="users[index].id">
              <el-select slot="prepend" value="1" placeholder="请选择">
                <el-option label="身份证" value="1" :checked="true"></el-option>
              </el-select>
            </el-input>
          </el-form-item>

          <span class="delete-user" @click="handleDeleteUser(index)">-</span>
        </div>
      </el-form>

      <el-button class="add-member" type="primary" @click="handleAddUsers">添加乘机人</el-button>
    </div>
    <!-- 保险 -->
    <div class="air-column">
      <h2>保险</h2>
      <div>
        <div class="insurance-item"
        v-for="(item,index) in infoData.insurances" :key="index">
          <el-checkbox
           :label="`${item.type}：￥${item.price}/份×1  最高赔付${item.compensation}万`"
            @change="changeInsurances(item)"
            border></el-checkbox>
        </div>
      </div>
    </div>
    <!-- 验证码 -->
    <div class="air-column">
      <h2>联系人</h2>
      <div class="contact">
        <el-form label-width="60px">
          <el-form-item label="姓名">
            <el-input v-model="contactName"></el-input>
          </el-form-item>

          <el-form-item label="手机">
            <el-input placeholder="请输入内容" v-model="contactPhone">
              <template slot="append">
                <el-button @click="handleSendCaptcha">发送验证码</el-button>
              </template>
            </el-input>
          </el-form-item>

          <el-form-item label="验证码">
            <el-input v-model="captcha"></el-input>
          </el-form-item>
        </el-form>
        <el-button type="warning" class="submit" @click="handleSubmit">提交订单</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      users: [
        {
          username: "",
          id: ""
        }
      ],
      insurances: [], //保险id
      contactName: "", //联系人名字
      contactPhone: "13794092524", //联系人电话
      invoice: "", //发票
      seat_xid: "", //座位Id
      air: "", //航班id
      captcha: "" ,//验证码
      infoData:{
        insurances:[]
      }
    };
  },
  computed: {
    allPrice(){
      let price = 0 ;
      //判断数据有没有回来，如果还没有那么返回一个0
      if(!this.infoData.airport_audlet) return 0 ;
      //机票单价
      price += this.infoData.seat_infos.org_settle_price;
      //基建燃油费
      price += this.infoData.airport_tax_audlet;
      //保险
      price += this.insurances.length * 30;
      //人数
      price += this.users.length;
      //使用store同步请求
      this.$store.commit('air/setAllPrice',price) 
    }
  },
  methods: {
    // 添加乘机人
    handleAddUsers() {
      //每点击一次添加一组表单
      this.users.push({
        username: "",
        id: ""
      });
    },
    //选中保险时触发
    changeInsurances(item) {
      //判断数组是否存在该id
      const index = this.insurances.indexOf(item.id);
      if (index > -1) {
        //如果有  删除
        this.insurances.splice(index, 1);
      } else {
        //修改data中insurances得值，添加进去
        this.insurances.push(item.id);
      }
    },
    // 移除乘机人
    handleDeleteUser(index) {
      //每点击一次移除当下索引的表单
      this.users.splice(index, 1);
    },

    // 发送手机验证码
    handleSendCaptcha() {
      //获取store里面设置好的异步请求  第一个参数是项目名称加方法  第二个为所需要传的参数
      this.$store.dispatch("user/sendCode", this.contactPhone).then(code => {
        //设置弹框
        //第一个为内容，第二个为标题
        this.$alert(`手机验证码是：${code}`, "提示", {
          //按钮内容
          confimButtonText: "确定",
          //按钮样式
          type: "warning"
        });
      });
    },

    // 提交订单
    handleSubmit() {
      //判断一下规则，判断内容是否为空
      const rules = {
        users: {
          value: this.users[0].username && this.users[0].id,
          message: "乘机人信息不能为空"
        },
        contactName: {
          value: this.contactName,
          message: "请输入联系人"
        },
        contactPhone: {
          value: this.contactPhone,
          message: "请输入手机号码"
        },
        captcha: {
          value: this.captcha,
          message: "请输入验证码"
        }
      };
      //循环判断通过
      let valid = true;
      Object.keys(rules).forEach(v => {
        // 如果false 那么返回
        if (!valid) return;

        //如果规则的内容没有
        if (!rules[v].value) {
          //那么马上停止循环并且提示信息
          valid = false;
          this.$message.warning(rules[v].message);
        }
      });
      //如果等于false直接返回
      if (!valid) return;

      //
      const data = {
        users: this.users,
        insurances:this.insurances, //保险id
        contactName:this.contactName, //联系人名字
        contactPhone: this.contactPhone, //联系人电话
        invoice: false, //发票
        seat_xid: this.$route.qeury.contactPhone, //座位Id
        air: this.$route.qeury.id, //航班id
        captcha:this.captcha //验证码
      };
      //发送提交订单请求
      this.$axios({
        url:'/airorders',
        method:'POST',
        data,
        headers:{
          //token规范
          Authorization : `Bearer ${this.$store.state.user.userInfo.token}`
        }
      }).then((res)=>{
        //把message，data解构出来
        const { message,data } = res.data;
        this.$message.success(message)
        //跳转到付款页面
        this.$router.push('/air/pay?id='+data.id)
      })
    }
  }
};
</script>

<style scoped lang="less">
.air-column {
  border-bottom: 1px #ddd dashed;
  padding-bottom: 20px;
  margin-bottom: 20px;
}

.air-column h2 {
  margin-bottom: 20px;
  font-size: 22px;
  font-weight: normal;
}

/deep/ .el-select .el-input {
  width: 130px;
}

.input-with-select {
  width: 590px;
}

.input-with-select /deep/ .el-input-group__prepend {
  background-color: #fff;
}
.member-info /deep/ .el-form-item {
  margin-bottom: 0;
}

.member-info-item {
  border-bottom: 1px #eee dashed;
  padding-bottom: 20px;
  position: relative;

  &:first-child {
    .delete-user {
      display: none;
    }
  }
}

.add-member {
  margin-top: 20px;
}

.delete-user {
  display: block;
  background: #ddd;
  width: 16px;
  height: 16px;
  font-size: 14px;
  text-align: center;
  line-height: 16px;
  color: #fff;
  cursor: pointer;
  border-radius: 50px;
  position: absolute;
  right: -30px;
  top: 50%;
}

.insurance {
  > div {
    margin-top: 10px;
  }
}

.insurance-item {
  margin-bottom: 20px;
}

.contact {
  /deep/ .el-input {
    width: 50%;
  }
}

.submit {
  margin: 50px auto;
  display: block;
  width: 250px;
  height: 50px;
}
</style>