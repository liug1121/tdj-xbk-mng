<template>
  <div class="box_subject">
    <el-row :gutter="20">
      <el-col :span="6">
        <channelTree ref="channerTreeRef" @channelChick="channelChick" @getChannelId="getChannelId" style="max-height:680px;overflow: auto"></channelTree>
      </el-col>
      <el-col :span="18">
        <div class="button_content">
          <div class="channel-name">{{this.selectedChannelName}}</div>
          <div class="tree-tab-unselected" :class="{' tree-selected':selectedTab == 0}" @click="tabSelect(0)" v-permission="{indentity:'bigflowStockDistrubute-billingRule'}">库存分配</div>
          <div class="tree-tab-unselected" :class="{' tree-selected':selectedTab == 1}" @click="tabSelect(1)" >大流量卡渠道产品</div>
          <div class="tree-tab-unselected" :class="{' tree-selected':selectedTab == 2}" @click="tabSelect(2)" v-permission="{indentity:'bigflowStockDistrubute-billingRule'}">出账规则管理</div>
          <div class="tree-tab-unselected" :class="{' tree-selected':selectedTab == 3}" @click="tabSelect(3)" v-permission="{indentity:'bigflowStockDistrubute-billingRule'}">渠道卡监控管理</div>
        </div>
        <el-card v-if="selectedTab == 3">
          <div class="button_content">
            <el-button size="medium" type="primary" icon="el-icon-plus" @click="toAddLbsChannelConfig">添加卡监控规则</el-button>
          </div>
          <el-table  :data="lbsChannelConfigs" border max-height="510" align="center" :cell-style="{height: '38px',padding:0}">
            <el-table-column v-for="(p, key) in table_column_lbs" :prop="p.prop" :label="p.label"  :key="key" align="center" :fixed="p.fixed?p.fixed:false" >
              <template slot-scope="scope">
                    <div v-if="p.prop == 'opts'">
                      <el-button type="text" size="small" @click="toModifyLbsChannelConfig(scope.row)">编辑</el-button>
                      <el-button type="text" size="small" @click="okRemoveLbsChannelConfig(scope.row)">删除</el-button>
                    </div>
                    <div v-else v-html="scope.row[p.prop]" />
              </template>
            </el-table-column>
          </el-table>
        </el-card>
        <el-dialog title="卡监控配置" :visible.sync="lbsChannelConfigDlgShowed" width="500px" @close="lbsChannelConfigDlgShowed = false">
          <el-form :model="lbsChannelConfigForm"  label-width="130px"> 
              <el-form-item label="卡监控类型">
              <el-select 
                filterable
              clearable
              reserve-keyword
                placeholder="请输入卡监控类型" v-model="lbsChannelConfigForm.type">
                <el-option v-for="item in lbsChannelConfigTypes" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="省份信息" v-if="lbsChannelConfigForm.type == 0 || lbsChannelConfigForm.type == 1">
              <el-select 
              multiple
              filterable
              clearable
              reserve-keyword
                placeholder="请选择省份信息" v-model="lbsChannelConfigForm.configValues">
                <el-option v-for="item in provincesList" :key="item.provinceId" :label="item.provinceName" :value="item.provinceId"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="imei池" v-if="lbsChannelConfigForm.type == 2">
              <el-select 
              filterable
              clearable
              reserve-keyword
                placeholder="请选择imei池" v-model="lbsChannelConfigForm.imeiPoolId">
                <el-option v-for="item in imeiBlackPoolsForSelected" :key="item.id" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="imei池" v-if="lbsChannelConfigForm.type == 3">
              <el-select 
              filterable
              clearable
              reserve-keyword
                placeholder="请选择imei池" v-model="lbsChannelConfigForm.imeiPoolId">
                <el-option v-for="item in imeiWhitePoolsForSelected" :key="item.id" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="lbsChannelConfigDlgShowed = false">取 消</el-button>
            <el-button type="primary" @click="okLbsChannelConfig">确 定</el-button>
          </span>  
        </el-dialog>

        <el-card v-if="selectedTab == 2">
          <div class="button_content">
            <el-button size="medium" type="primary" icon="el-icon-plus" @click="showAddFlowPool">添加规则</el-button>
          </div>
          <el-table  :data="channelBillingFeeConfigs" border max-height="510" align="center" :cell-style="{height: '38px',padding:0}">
            <el-table-column v-for="(p, key) in table_column_channelBillingFeeConfig" :prop="p.prop" :label="p.label"  :key="key" align="center" :fixed="p.fixed?p.fixed:false" >
              <template slot-scope="scope">
                    <div v-if="p.prop == 'opts'">
                      <el-button type="text" size="small" @click="okEditChannelFeeConfig(scope.row)">编辑</el-button>
                      <el-button type="text" size="small" @click="okRemoveChannelFeeConfig(scope.row)">删除</el-button>
                    </div>
                    <div v-else v-html="scope.row[p.prop]" />
              </template>
            </el-table-column>
          </el-table>
        </el-card>
        <el-card v-if="selectedTab == 1">
          <el-form :inline="true" ref="queryChannelRef" :model="queryChannelProductForm">
              <el-form-item label="产品编码">
                <el-input style="width:300px;" v-model="queryChannelProductForm.productCode" placeholder="请输入产品编码" ></el-input>
              </el-form-item>
              <el-button size="medium" type="primary" @click="queryChannelProducts">查询</el-button>
          </el-form>
          <div class="button_content">
            <el-button size="medium" type="primary" icon="el-icon-plus" @click="showProductDlg = true">添加</el-button>
          </div>
          <el-table  :data="channelProducts" border max-height="510" align="center" :cell-style="{height: '38px',padding:0}">
            <el-table-column v-for="(p, key) in table_column_product" :prop="p.prop" :label="p.label"  :key="key" align="center" :fixed="p.fixed?p.fixed:false" >
              <template slot-scope="scope">
                  <div v-if="p.prop == 'channelName'">
                    <span>{{selectedChannelName}}</span>
                  </div>
                  <div v-else>
                      <div v-if="p.prop == 'opts'" v-permission="{indentity:'bigflowStockDistrubute-productEdnt'}">
                        <!-- @click="okShowBigflowProductEdit(scope.row)" -->
                        
                        <!-- <el-button type="text" size="small" v-if="scope.row.statusName == '下架状态'" @click="okChangeProductStatus(scope.row, 0)">上架</el-button>
                        <el-button type="text" size="small" v-if="scope.row.statusName == '上架状态'" @click="okChangeProductStatus(scope.row, 1)">下架</el-button> -->
                        <el-button type="text" size="small" @click="toProductEdit(scope.row)">编辑</el-button>
                        <el-button type="text" size="small" @click="okRemoveProduct(scope.row)">删除</el-button>
                        <!-- <el-button type="text" size="small" @click="okDeleteFengwo(scope.row)">删除</el-button> -->
                      </div>
                      <div v-else v-html="scope.row[p.prop]" />
                  </div>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination @size-change="handleProductSizeChange" @current-change="handleProductCurrentChange" :current-page="productPage" :page-sizes="[10,20,30]" :page-size="productPageSize" layout="total, sizes, prev, pager, next, jumper"
                :total="productTotal">
            </el-pagination>
        </el-card>
        <el-card v-if="selectedTab == 0">
          <el-form :inline="true" ref="queryChannelRef" :model="queryChannelCardForm">
              <el-form-item label="ICCID">
                <el-input style="width:300px;" v-model="queryChannelCardForm.iccid" placeholder="请输入iccid" ></el-input>
              </el-form-item>
              <el-form-item label="卡号码">
                <el-input style="width:300px;" v-model="queryChannelCardForm.phone" placeholder="请输入iccid" ></el-input>
              </el-form-item>
              <el-form-item label="卡状态">
                  <el-select 
                    filterable
                    clearable
                    reserve-keyword
                    placeholder="请选择卡状态" v-model="queryChannelCardForm.status">
                        <el-option v-for="item in statusTypes" :key="item.value" :label="item.label" :value="item.value"></el-option>
                  </el-select>
                <!-- <el-input style="width:300px;" v-model="queryChannelCardForm.status" placeholder="请输入卡状态" ></el-input> -->
              </el-form-item>
              <el-button size="medium" type="primary" @click="queryChannelCards">查询</el-button>
          </el-form>
          <div class="button_content">
            <el-button size="medium" type="primary" icon="el-icon-plus" v-permission="{indentity:'bigflowStockDistrubute-toChannel'}">分配渠道</el-button>
            <el-button size="medium" type="primary" icon="el-icon-plus" @click="showDistrubuteBetween" v-permission="{indentity:'bigflowStockDistrubute-toBetweenChannel'}">首尾分配渠道</el-button>
          </div>
          <el-table  :data="channelStocks" border max-height="510" align="center" :cell-style="{height: '38px',padding:0}">
            <el-table-column v-for="(p, key) in table_column" :prop="p.prop" :label="p.label"  :key="key" align="center" :fixed="p.fixed?p.fixed:false" :show-overflow-tooltip='true'>
              <template slot-scope="scope">
                  <!-- <div v-if="p.prop == 'channelName'">
                    <span>{{selectedChannelName}}</span>
                  </div> -->
                  <div>
                      <div v-html="scope.row[p.prop]" />
                  </div>
              </template>
            </el-table-column>
          </el-table>
           <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page" :page-sizes="[10,20,30]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper"
                :total="total">
            </el-pagination>
        </el-card>
      </el-col>
    </el-row>
    <el-dialog title="渠道分配" :visible.sync="showDistrubuteDlg" width="500px" @close="hideDistrubuteBetween">
      <el-form :model="distrubuteForm"  label-width="130px">
          <el-form-item label="分配渠道">
          <el-select 
            filterable
          clearable
          reserve-keyword
            placeholder="请输入父渠道" v-model="distrubuteForm.channelId">
            <el-option v-for="item in channels" :key="item.channelId" :label="item.name" :value="item.channelId"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="首ICCID（19位）">
          <el-input style="width:300px;"  v-model="distrubuteForm.iccidStart" placeholder="请输入首ICCID" ></el-input>
        </el-form-item>
        <el-form-item label="尾ICCID（19位）">
          <el-input style="width:300px;"  v-model="distrubuteForm.iccidEnd" placeholder="请输入联系人尾ICCID" ></el-input>
        </el-form-item>
      </el-form>
      <span>
          <p>1）注意：请输入19位数的ICCID，每次分配不能超过2万张卡</p>

          <p>2）系统会根据输入的首ICCID（包含），和尾ICCID（包含），查询出这之间的数据进行分配渠道</p>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="hideDistrubuteBetween">取 消</el-button>
        <el-button type="primary" @click="okDistrubuteBetween">确 定</el-button>
      </span>  
    </el-dialog>

    <el-dialog title="新增大流量产品" :visible.sync="showProductDlg" width="500px" @close="showProductDlg = false">
      <el-form :model="productForm"  label-width="130px"> 
          <el-form-item label="产品名">
          <el-select 
            filterable
          clearable
          reserve-keyword
            placeholder="请输入产品名" v-model="productForm.productCode">
            <el-option v-for="item in productCodes" :key="item.value" :label="item.name" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="产品状态">
          <el-select 
            filterable
          clearable
          reserve-keyword
            placeholder="请输入产品状态" v-model="productForm.status">
            <el-option v-for="item in productStatus" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showProductDlg = false">取 消</el-button>
        <el-button type="primary" @click="okAddChannelProduct">确 定</el-button>
      </span>  
    </el-dialog>
    <el-dialog title="渠道出账管理" :visible.sync="showChannelFeeConfigDlg" width="500px" @close="showChannelFeeConfigDlg = false">
      <el-form :model="channelBillingConfigForm"  label-width="130px"> 
        <el-form-item label="流量出账类型">
          <el-select 
            filterable
          clearable
          reserve-keyword
            placeholder="请输入出账类型" v-model="channelBillingConfigForm.payType" @change="selectPayType">
            <el-option v-for="item in payTypes" :key="item.value" :label="item.name" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <div v-if="billType == 4">
           <el-form-item label="出账类型">
            <el-select 
            clearable
            reserve-keyword
              placeholder="请输入出账类型" v-model="channelBillingConfigForm.outBillType">
              <el-option v-for="item in outBillTypes" :key="item.value" :label="item.name" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <div v-if="channelBillingConfigForm.outBillType == 0">
            <el-form-item label="套内套餐类型">
              <el-select 
              clearable
              reserve-keyword
                placeholder="请选择套内套餐类型" v-model="channelBillingConfigForm.cardLowDoseType">
                <el-option v-for="item in cardLowDoseTypes" :key="item.value" :label="item.name" :value="item.value"></el-option>
              </el-select>
            </el-form-item>
          </div>
          <div v-if="channelBillingConfigForm.outBillType == 1">
            <el-form-item label="套内用量类型">
              <el-select 
              clearable
              reserve-keyword
                placeholder="请选择套内用量类型" v-model="channelBillingConfigForm.lowDoseType">
                <el-option v-for="item in lowDoseTypes" :key="item.value" :label="item.name" :value="item.value"></el-option>
              </el-select>
            </el-form-item>
          </div>
          <el-form-item label="单卡套餐内用量(G)" v-if="channelBillingConfigForm.lowDoseType == 0">
            <el-input style="width:300px;" onkeyup="value=value.replace(/[^?\d.]/g,'')" v-model="channelBillingConfigForm.cardLowDose" placeholder="请输入" ></el-input>
          </el-form-item>
          <el-form-item label="套餐内用量(G)" v-if="channelBillingConfigForm.lowDoseType != 0">
            <el-input style="width:300px;" onkeyup="value=value.replace(/[^?\d.]/g,'')" v-model="channelBillingConfigForm.lowDose" placeholder="请输入" ></el-input>
          </el-form-item>
          <el-form-item label="套餐内费用(元)" >
            <el-input style="width:300px;" onkeyup="value=value.replace(/[^?\d.]/g,'')" v-model="channelBillingConfigForm.lowDoseFee" placeholder="请输入" ></el-input>
          </el-form-item>
          <el-form-item label="超量是否关停">
            <el-select 
            clearable
            reserve-keyword
              placeholder="请选择是否关停" v-model="channelBillingConfigForm.closeForOffUsage">
              <el-option v-for="item in closeForOffUsageTypes" :key="item.value" :label="item.name" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="超量出账规则">
            <el-select 
            clearable
            reserve-keyword
              placeholder="请选择超量出账规则" v-model="channelBillingConfigForm.offRule">
              <el-option v-for="item in offRules" :key="item.value" :label="item.name" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <div v-if="channelBillingConfigForm.offRule == 0">
            <el-form-item label="超量单价（元/G）">
              <el-input style="width:300px;" onkeyup="value=value.replace(/[^?\d.]/g,'')" v-model="channelBillingConfigForm.offRuleFee" placeholder="请输入" ></el-input>
            </el-form-item>
          </div>
          <div v-if="channelBillingConfigForm.offRule == 1">
            <el-table   :data="offLevelPrices" border max-height="600" align="center" :cell-style="{height: '38px',padding:0}">
              <el-table-column type="selection" width="55">
              </el-table-column>
              <el-table-column v-for="(p, key) in table_column_price" :prop="p.prop" :label="p.label"  :key="key" align="center" :fixed="p.fixed?p.fixed:false" :sortable="p.sortable">
                <template slot-scope="scope">
                  <div v-if="p.prop == 'opts'">
                    <el-button type="text" size="small" @click="removePrice(scope.row.id)">删除</el-button>
                    <el-button type="text" size="small" @click="modifyPrice(scope.row)">修改</el-button>
                  </div> 
                  <div v-else v-html="scope.row[p.prop]" />
                </template>
              </el-table-column>
            </el-table>
            <el-button type="primary" @click="addPrice">添加价格规则</el-button>
          </div>
        </div>
        <div v-if="billType == 2">
          <el-form-item label="月套餐可用量(G)" >
            <el-input style="width:300px;" onkeyup="value=value.replace(/[^?\d.]/g,'')" v-model="channelBillingConfigForm.monthDose" placeholder="请输入" ></el-input>
          </el-form-item>
          <el-form-item label="月套餐费用(元)">
            <el-input style="width:300px;" onkeyup="value=value.replace(/[^?\d.]/g,'')" v-model="channelBillingConfigForm.monthFee" placeholder="请输入" ></el-input>
          </el-form-item>
          <el-form-item label="超量单价（元/G）">
            <el-input style="width:300px;" onkeyup="value=value.replace(/[^?\d.]/g,'')" v-model="channelBillingConfigForm.offPerFee" placeholder="请输入" ></el-input>
          </el-form-item>
        </div>
        <div v-if="unitFeeShow== true">
          <el-form-item label="流量单价(元/G)" >
            <el-input style="width:300px;" onkeyup="value=value.replace(/[^?\d.]/g,'')" v-model="channelBillingConfigForm.unitPrice" placeholder="请输入省内流量单价" ></el-input>
          </el-form-item>
          <el-form-item label="流量区域">
          <el-select 
            filterable
          clearable
          reserve-keyword
            placeholder="请输入流量区域" v-model="channelBillingConfigForm.area">
            <el-option v-for="item in areas" :key="item.value" :label="item.name" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
          <!-- <el-form-item label="省内单价(元/G)" >
            <el-input style="width:300px;" onkeyup="value=value.replace(/[^?\d.]/g,'')" v-model="channelBillingConfigForm.provinceUnitPrice" placeholder="请输入省内流量单价" ></el-input>
          </el-form-item>
          <el-form-item label="全国单价(元/G)">
            <el-input style="width:300px;" onkeyup="value=value.replace(/[^?\d.]/g,'')" v-model="channelBillingConfigForm.countryUnitPrice" placeholder="请输入全国流量单价" ></el-input>
          </el-form-item> -->
        </div>
        
        <!-- <el-form-item label="卡费出账类型">
          <el-select 
            filterable
          clearable
          reserve-keyword
            placeholder="请输入出账类型卡费出账类型" v-model="channelBillingConfigForm.cardFeePayType" @change="selectCardFeePayType">
            <el-option v-for="item in cardFeePayTypes" :key="item.value" :label="item.name" :value="item.value"></el-option>
          </el-select>
        </el-form-item> -->
        <div v-if="isShow == true">
        <el-form-item label="开始月数">
          <el-input style="width:300px;" onkeyup="value=value.replace(/[^?\d.]/g,'')" v-model="channelBillingConfigForm.cardFeeMonthFrom" placeholder="请输入开始月数" ></el-input>
        </el-form-item>
        <el-form-item label="总月数">
          <el-input style="width:300px;" onkeyup="value=value.replace(/[^?\d.]/g,'')" v-model="channelBillingConfigForm.cardFeeMonths" placeholder="请输入总月数" ></el-input>
        </el-form-item>
        </div>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showChannelFeeConfigDlg = false">取 消</el-button>
        <el-button type="primary" @click="okChannelFeeConfig">确 定</el-button>
      </span>  
    </el-dialog>
    <el-dialog title="编辑渠道产品" :visible.sync="showProductEditDlg" width="500px" @close="showProductEditDlg = false">
      <el-form :model="productEditForm"  label-width="130px"> 
        <el-form-item label="销售价格">
          <el-input style="width:300px;" onkeyup="value=value.replace(/[^?\d.]/g,'')" v-model="productEditForm.salePrice" placeholder="请输入销售价格" ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showProductEditDlg = false">取 消</el-button>
        <el-button type="primary" @click="okProductEdit">确 定</el-button>
      </span>  
    </el-dialog>
    <el-main class="el-loading" v-loading="loading" element-loading-background="transparent"
        element-loading-text="加载中" > 
    </el-main>

    <el-dialog title="价格规则" :visible.sync="priceShowed" width="430px" @close="priceShowed = false">
      <!-- 内容主体区域 -->
      <el-form :model="priceForm" ref="addFormRef" label-width="90px">
        <el-form-item label="档位（M）">
          <el-input style="width:250px;" onkeyup="value=value.replace(/[^\-?\d.]/g,'')"  v-model="priceForm.level" placeholder="请输入档位"></el-input>
        </el-form-item>
        <el-form-item label="价格（元）">
          <el-input style="width:250px;" oninput="value=value.replace(/[^\d.]/g, '').replace(/\.{2,}/g, '.').replace('.', '$#$').replace(/\./g, '').replace('$#$', '.').replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3').replace(/^\./g, '')"  v-model="priceForm.price" placeholder="请输入价格"></el-input>
          <!-- <el-input-number style="width:250px;" auto-complete="off" :precision="2" :controls="false"  v-model="amountPriceForm.price" placeholder="请输入价格"></el-input-number> -->
        </el-form-item>
      </el-form>
      <!-- 底部区域 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="amountPpriceShowed = false">取 消</el-button>
        <el-button type="primary" @click="okPrice">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import APIDataMoniter from 'api/dataMoniting'
import API from 'api/baseSet'
import channelTree from "./channelTree"
import apiBigflow from 'api/bigflow'
import apiChannel from 'api/channels'
export default {
  name: 'channelList',
  components: {
    channelTree,
    // SelectTree
  },
  data () {
    return {
      billType:'',
      imeiPools:[],
      imeiWhitePoolsForSelected:[],
      imeiBlackPoolsForSelected:[],
      showProductEditDlg:false,
      productEditForm:{
        salePrice:'',
        channelProductId:''
      },
      lbsChannelConfigs:[],
      provincesList:[],
      lbsChannelConfigForm:{
        configId:null,
        channelId:'',
        type:null,
        configValues:[]
      },
      lbsChannelConfigDlgShowed:false,
      unitFeeShow:false,
      isShow:false,
      channelBillingConfigForm:{
         id:null,
	       channelId:null,
         unitPrice:null,
	       provinceUnitPrice:null,
	       countryUnitPrice:null,
	       payType:null,
	       cardFeePayType:null,
	       cardFeeMonthFrom:null,
	       cardFeeMonths:null,
         area:null,
         monthDose:0,
         monthFee:'',
         offPerFee:'',
         outBillType: 1,
         lowDose:0,
         lowDoseFee:'0.00',
         closeForOffUsage: 1,
         offRule:0,
         offRuleFee: '0.00',
         lowDoseType:1,
         cardLowDose:0,
         cardLowDoseType:0
      },
      showChannelFeeConfigDlg:false,
      channelBillingFeeConfigs:[],
      productCodes:[],
      productForm:{},
      showProductDlg:false,
      queryChannelProductForm:{},
      selectedTab:1,
      showDistrubuteDlg:false,
      distrubuteForm:{},
      queryChannelCardForm:{},
      loading:false,
      channels:[],
      channelStocks:[],
      channelProducts:[],
      selecedChannelCode:'',
      selectedChannelName:'',
      productPage:1,
      productPageSize:10,
      productTotal:0,
      page: 1,
      pageSize: 20,
      total: 0,
      table_column: [
        { prop: 'iccid', label: 'ICCID', width: 200 },
        { prop: 'phoneNumber', label: '卡号码', width: 200 },
        { prop: 'status', label: '卡状态', width: 120 },
        { prop: 'channelName', label: '渠道', width: 220 },
        { prop: 'gmtStockDate', label: '划拨时间', width: 140 },
        // { prop: 'salePoint', label: '网点', width: 50 },
        // { prop: 'salePersonName', label: '销售员', width: 50 } 
      ],
      table_column_product: [
        { prop: 'productCode', label: '产品编码', width: 80 },
        { prop: 'productTypeName', label: '产品类型', width: 80 },
        { prop: 'viewName', label: '产品名', width: 100 },
        { prop: 'highUseName', label: '高速用量', width: 80 },
        { prop: 'mediumUseName', label: '中速用量', width: 80 },
        { prop: 'flowTotalDoseName', label: '可用总量', width: 80 },
        { prop: 'originalPrice', label: '原始价', width: 50 },
        { prop: 'price', label: '销售价', width: 50 },
        { prop: 'statusName', label: '状态', width: 50 },
        { prop: 'memo', label: '产品说明', width: 230 },
        { prop: 'opts', label: '操作', width: 150 ,fixed:'right'}
      ],

      table_column_lbs:[
        { prop: 'lbsTypeName', label: '监控类型', width: 80 },
        { prop: 'lbsNames', label: '配置信息', width: 80 },
        { prop: 'opts', label: '操作', width: 200 }
      ],

      table_column_channelBillingFeeConfig:[
        { prop: 'payTypeName', label: '流量出账类型', width: 80 },
        { prop: 'areaName', label: '流量区域', width: 120 },
        { prop: 'unitPrice', label: '账户池套餐 或 流量单价（元/G）', width: 120 },
        { prop: 'monthDose', label: '套餐内可用量', width: 120 },
        { prop: 'monthFee', label: '套餐内费用(元)', width: 120 },
        { prop: 'offPerFee', label: '超套单价（元/G）', width: 120 },

        { prop: 'outBillType', label: '自定义出账类型', width: 120 },
        { prop: 'lowDose', label: '套餐内用量(G)', width: 120 },
        { prop: 'lowDoseFee', label: '套餐内费用(元)', width: 120 },
        { prop: 'closeForOffUsageName', label: '超量是否关停', width: 120 },
        { prop: 'offRuleName', label: '超量出账规则', width: 120 },
        { prop: 'offRuleFee', label: '超量单价（元/G）', width: 120 },
        { prop: 'lowDoseTypeName', label: '套内用量类型', width: 120 },
        { prop: 'cardLowDose', label: '单卡套餐内用量(G)', width: 120 },
        { prop: 'cardLowDoseTypeName', label: '单卡套内套餐类型', width: 120 },
        { prop: 'opts', label: '操作', width: 120 }
      ],
      lbsChannelConfigTypes:[
        {label:'省份白名单', value:1},
        {label:'省份黑名单', value:0},
        {label:'imei白名单组', value:3},
        {label:'imei黑名单组', value:2},
      ],
      statusTypes:[
        {label:'可销售', value:2},
        {label:'已激活', value:6}
    ],
    productStatus:[
      {label:'上架状态', value:1},
      {label:'下架状态', value:2},
    ],
    cardLowDoseTypes:[
      {name:'单卡总用量', value:0},
      {name:'所有卡平均用量', value:1},
    ],
    lowDoseTypes:[
      {name:'按实际出账卡动态累计', value:0},
      {name:'固定用量', value:1},
    ],
    offRules:[
      {name:'按单价计费（元/G）', value:0},
      {name:'按跳档计费', value:1},
    ],
    closeForOffUsageTypes:[
      {name:'不关停', value:0},
      {name:'关停', value:1},
    ],
    loseDoseTypes: [
      {name:'无', value:0},
      {name:'有', value:1},
    ],
    outBillTypes:[
      {name:'单卡', value:0},
      {name:'卡池', value:1},
    ],
    areas:[
      {name:'全国', value:'all'},
      {name:'省内', value:'province'}
    ],
    payTypes:[
      // {name:'月套餐出账', value:1},
      {name:'实际用量出账', value:0},
      // {name:'包量套餐出账', value:2},
      {name:'账户池套餐出账', value:3},
      {name:'单卡套餐', value:1},
      {name:'包月流量池套餐', value:2},
      {name:'自定义出账规则', value:4}
    ],
    cardFeePayTypes:[
      {name:'根据实名状态，未实名的卡收取', value:0},
      {name:'根据用量状态，当月用量为0的卡收取', value:1},
      // {name:'从N月开始收取1毛，连续收6个月或一直收取', value:2},
      {name:'不收卡费', value:3}
    ],
    priceForm:{},
    priceShowed:false,
    // 列表，标题、字段
    offLevelPrices:[
    ],
    table_column_price:[
      { prop: 'level', label: '档位(M)', width: 100, sortable: true },
      { prop: 'price', label: '价格(元)', width: 100, sortable: true },
      { prop: 'opts', label: '操作', width: 100, sortable: true }
    ],
    }
  },

  mounted () {
    this.getProvincesList()
    this.getChannels()
    this.getChannelStocks()
    this.getChannelProducts()
    this.getProductCodes()
    this.getChannelBillingFeeConfigs()
    this.getAllCardScanPools()
  },
  methods: {
    clearChannelBillConfigForm:function(){
      let form = {
         id:null,
	       channelId:null,
         unitPrice:null,
	       provinceUnitPrice:null,
	       countryUnitPrice:null,
	       payType:null,
	       cardFeePayType:null,
	       cardFeeMonthFrom:null,
	       cardFeeMonths:null,
         area:null,
         monthDose:0,
         monthFee:'',
         offPerFee:'',
         outBillType: 1,
         lowDose:0,
         lowDoseFee:'0.00',
         closeForOffUsage: 1,
         offRule:0,
         offRuleFee: '0.00',
         lowDoseType:1,
         cardLowDose:0,
         cardLowDoseType:0
      }
      this.channelBillingConfigForm = form
    },
    getNextAmountPriceRowId(){
      var s = [];
      var hexDigits = "0123456789abcdef";
      for (var i = 0; i < 36; i++) {
          s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
      }
      s[14] = "4";  // bits 12-15 of the time_hi_and_version field to 0010
      s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01
      s[8] = s[13] = s[18] = s[23] = "-";
  
      var uuid = s.join("");
      console.log(uuid)
      return uuid;
    },
    okPrice:function(){
      this.$confirm('您确认要此操作, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
      }).then(() => {
        if(this.priceForm.id == undefined || this.priceForm.id == null){
        let row2Add = {
          id:this.getNextAmountPriceRowId(),
          level:this.priceForm.level,
          price:this.priceForm.price
        }
        this.offLevelPrices.push(row2Add)
        this.priceShowed = false
      }else{
        this.offLevelPrices.forEach(price => {
          if(price.id === this.priceForm.id){
            price.level = this.priceForm.level
            price.price = this.priceForm.price
          }
        });
        this.priceShowed = false
      }
      }).catch(() => {
      })
    },
    modifyPrice:function(price){
      this.priceForm.id = price.id
      this.priceForm.level = price.level
      this.priceForm.price = price.price
      this.priceShowed = true
    },
    removePrice:function(id){
      this.$confirm('您确认要此操作, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
      }).then(() => {
        this.offLevelPrices = this.offLevelPrices.filter(function(item) {
            return item.id !== id
        });
      }).catch(() => {
      })
      
    },
    addPrice:function(){
      this.priceForm = {}
      this.priceShowed = true
    },
   getAllCardScanPools:function(){
      APIDataMoniter.apiCardScanPools().then(res => {
        if (res.resultCode === 0) {
          this.imeiPools = res.data
          this.imeiWhitePoolsForSelected = this.imeiPools.filter(pool=>{
              if(pool.type === 0)
                  return true
              return false
          })
          this.imeiBlackPoolsForSelected = this.imeiPools.filter(pool=>{
              if(pool.type === 1)
                  return true
              return false
          })
        } else {
          this.$message.error(res.resultInfo)
        }
      })
    },
    toProductEdit:function(product){
      this.productEditForm.salePrice = product.price
      this.productEditForm.channelProductId = product.id
      this.showProductEditDlg = true
    },
    okProductEdit:function(){
      this.$confirm('您确认要此操作, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
      }).then(() => {
        let params = {}
        params = this.productEditForm
        apiBigflow.modifychannelProductPrice(params).then(res=>{
          if(res.resultCode == 0){
              this.$message.success('操作成功')
              this.getChannelProducts()
              this.showProductEditDlg = false
          }else{
              this.$message.error('操作失败')
          }
      })
      }).catch(() => {
      });
    },
    toModifyLbsChannelConfig:function(row){
      this.lbsChannelConfigDlgShowed = true
      this.lbsChannelConfigForm.configId = row.id
      this.lbsChannelConfigForm.channelId = row.channel_id
      this.lbsChannelConfigForm.type = row.lbs_type
      if(this.lbsChannelConfigForm.type === 0 || this.lbsChannelConfigForm.type === 1){
        if(row.lbs_values != undefined && row.lbs_values != '' && row.lbs_values != null){
          let strLbsValues = row.lbs_values.split(',')
          this.lbsChannelConfigForm.configValues = strLbsValues.map(value => {
            return Number(value)
          })
        }
      }else if(this.lbsChannelConfigForm.type === 2 || this.lbsChannelConfigForm.type === 3){
        this.lbsChannelConfigForm.imeiPoolId = Number(row.lbs_values)
      }
    },
    okRemoveLbsChannelConfig:function(config){
      this.$confirm('您确认要此操作, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
      }).then(() => {
        let params = {}
        params.configId = config.id
        apiChannel.apiRemoveChannelLbsConfig(params).then(res=>{
          if(res.resultCode == 0){
              this.$message.success('操作成功')
              this.getLbsChannelConfigs()
          }else{
              this.$message.error('操作失败')
          }
      })
      }).catch(() => {
      });
    },
    getLbsChannelConfigs:function(){
      let params = {}
        params.channelId = this.selecedChannelCode
        apiChannel.apiGetChannelLbsConfig(params).then(res=>{
          if(res.resultCode == 0){
            this.lbsChannelConfigs = res.data
          }
      })
    },
    getProvincesList () {
      API.apiProvincesList().then(res => {
        if (res.resultCode === 0) {
          this.provincesList = res.data
          // console.log(this.provincesList);
        } else {
          this.$message.error(res.resultInfo)
        }
      })
    },
    okLbsChannelConfig:function(){
      console.log(JSON.stringify(this.lbsChannelConfigForm))
      this.$confirm('您确认要此操作, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
      }).then(() => {
        let params = {}
        params = this.lbsChannelConfigForm
        if(params.configId == undefined || params.configId == null || params.configId == ''){
          apiChannel.apiAddChannelLbsConfig(params).then(res=>{
              if(res.resultCode == 0){
                  // that.getChannelBillingFeeConfigs()
                  this.$message.success('操作成功')
                  this.lbsChannelConfigDlgShowed = false
                  this.getLbsChannelConfigs()
              }else{
                  this.$message.error('操作失败,' + res.resultInfo)
              }
          })
        }else{
          apiChannel.apiModifyChannelLbsConfig(params).then(res=>{
              if(res.resultCode == 0){
                  this.$message.success('操作成功')
                  this.lbsChannelConfigDlgShowed = false
                  this.getLbsChannelConfigs()
              }else{
                  this.$message.error('操作失败,' + res.resultInfo)
              }
          })
        }
        
      }).catch(() => {
      });
    },
    clearLbsChannelConfigForm:function(){
      this.lbsChannelConfigForm = {
        configId:null,
        channelId:'',
        type:null,
        configValues:[]
      }
    },
    toAddLbsChannelConfig:function(){
      if(this.selecedChannelCode == null || this.selecedChannelCode == undefined || this.selecedChannelCode == ''){
        this.$message.success('请先选择要操作的渠道')
        return
      }
      this.lbsChannelConfigDlgShowed = true
      this.clearLbsChannelConfigForm()
      this.lbsChannelConfigForm.channelId = this.selecedChannelCode 
    },
    selectPayType:function(value){
      if(value == 0){
        this.unitFeeShow = true
      } else
        this.unitFeeShow = false
      this.billType = value
    },
    selectCardFeePayType:function(value){
      if(value != 3){
        this.isShow = true
      }else{
        this.isShow = false
      }
    },
    showAddFlowPool:function(){
      if(this.selecedChannelCode == null || this.selecedChannelCode == undefined || this.selecedChannelCode == ''){
        this.$message.success('请先选择要操作的渠道')
        return
      }
      if(this.channelBillingFeeConfigs.length > 0){
        this.$message.success('一个渠道只能有一个出账规则')
        return
      }
      this.showChannelFeeConfigDlg = true 
      this.billType = ''
      this.clearChannelBillConfigForm()
    },
    okEditChannelFeeConfig:function(row){
      console.log(row)
      this.channelBillingConfigForm = row
      this.showChannelFeeConfigDlg = true
      this.selectPayType(this.channelBillingConfigForm.payType)
      console.log('row:' + JSON.stringify(row))
      this.offLevelPrices = row.prices
    },
    feeConfigValid:function(){
      if(this.billType == null || this.billType == undefined){
        this.$message.error('流量出账类型不能为空')
        return false;
      }
      if(this.billType ===4){
        console.log(this.channelBillingConfigForm.outBillType)
        if(this.channelBillingConfigForm.outBillType == null || this.channelBillingConfigForm.outBillType == undefined || this.channelBillingConfigForm.outBillType === ''){
          this.$message.error('出账类型不能为空')
          return false;
        }
        if(this.channelBillingConfigForm.outBillType === 0){
          if(this.channelBillingConfigForm.cardLowDoseType == null || this.channelBillingConfigForm.cardLowDoseType == undefined || this.channelBillingConfigForm.cardLowDoseType === ''){
            this.$message.error('套内套餐类型不能为空')
            return false;
          }
          if(this.channelBillingConfigForm.lowDose == null || this.channelBillingConfigForm.lowDose == undefined || this.channelBillingConfigForm.lowDose === '' || this.channelBillingConfigForm.lowDose < 0){
            this.$message.error('套餐内用量不能为空或者小于0')
            return false;
          }
          if(this.channelBillingConfigForm.lowDoseFee == null || this.channelBillingConfigForm.lowDoseFee == undefined || this.channelBillingConfigForm.lowDoseFee === ''){
            this.$message.error('套餐内费用不能为空')
            return false;
          }
        }else if(this.channelBillingConfigForm.outBillType === 1){
          if(this.channelBillingConfigForm.lowDoseType == null || this.channelBillingConfigForm.lowDoseType == undefined || this.channelBillingConfigForm.lowDoseType === ''){
            this.$message.error('套内用量类型不能为空')
            return false;
          }
          if(this.channelBillingConfigForm.lowDoseType === 0){
            if(this.channelBillingConfigForm.cardLowDose == null || this.channelBillingConfigForm.cardLowDose == undefined || this.channelBillingConfigForm.cardLowDose === '' || this.channelBillingConfigForm.cardLowDose < 0){
              this.$message.error('单卡套餐内用量不能为空或者小于零')
              return false;
            }
            if(this.channelBillingConfigForm.lowDoseFee == null || this.channelBillingConfigForm.lowDoseFee == undefined || this.channelBillingConfigForm.lowDoseFee === ''){
              this.$message.error('套餐内费用不能为空')
              return false;
            }
          }else if(this.channelBillingConfigForm.lowDoseType === 1){
            if(this.channelBillingConfigForm.lowDose == null || this.channelBillingConfigForm.lowDose == undefined || this.channelBillingConfigForm.lowDose === '' || this.channelBillingConfigForm.lowDose < 0){
              this.$message.error('套餐内用量不能为空或者小于零')
              return false;
            }
            if(this.channelBillingConfigForm.lowDoseFee == null || this.channelBillingConfigForm.lowDoseFee == undefined || this.channelBillingConfigForm.lowDoseFee === ''){
              this.$message.error('套餐内费用不能为空')
              return false;
            }
          }
        }
        if(this.channelBillingConfigForm.closeForOffUsage == null || this.channelBillingConfigForm.closeForOffUsage == undefined || this.channelBillingConfigForm.closeForOffUsage === ''){
          this.$message.error('超量是否关停不能为空')
          return false;
        }
        if(this.channelBillingConfigForm.offRule === 0){
          if(this.channelBillingConfigForm.offRuleFee == null || this.channelBillingConfigForm.offRuleFee == undefined || this.channelBillingConfigForm.offRuleFee === ''){
            this.$message.error('超量单价不能为空')
            return false;
          }
        }else if(this.channelBillingConfigForm.offRule === 1){
          if(this.offLevelPrices == null || this.offLevelPrices == undefined || this.offLevelPrices === '' || this.offLevelPrices.length == 0){
            this.$message.error('跳档价格为空')
            return false;
          }
        }
      }
      return true
    },
    okChannelFeeConfig:function(){
      console.log(this.billType)
      if(!this.feeConfigValid()){
        return
      }
      let that = this
      this.$confirm('您确认要此操作, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
      }).then(() => {
        if(this.channelBillingConfigForm.id == null || this.channelBillingConfigForm.id == undefined){
            let params = this.channelBillingConfigForm
            params.channelId = this.selecedChannelCode
            params.prices = this.offLevelPrices
            console.log('**' + JSON.stringify(params))
            apiBigflow.addChannelBillingFeeConfig(params).then(res=>{
              if(res.resultCode == 0){
                  that.getChannelBillingFeeConfigs()
                  that.showChannelFeeConfigDlg = false
                  this.$message.success('操作成功')
              }else{
                  this.$message.success('操作失败')
              }
          })
        }else{
            let params = this.channelBillingConfigForm
            params.prices = this.offLevelPrices
            console.log('params:' + JSON.stringify(params))
            apiBigflow.modifyChannelBillingFeeConfig(params).then(res=>{
              if(res.resultCode == 0){
                  that.getChannelBillingFeeConfigs()
                  that.showChannelFeeConfigDlg = false
                  this.$message.success('操作成功')
              }else{
                  this.$message.success('操作失败')
              }
          })
        }
      }).catch(() => {
      });
    },
    getChannelBillingFeeConfigs:function(){
      let params = {}
      params.channelId = this.selecedChannelCode
      console.log(JSON.stringify(params))
      apiBigflow.getChannelBillingFeeConfigs(params).then(res=>{
          if(res.resultCode == 0){
            this.channelBillingFeeConfigs = res.data
            // this.offLevelPrices = res.data.prices
            // console.log(JSON.stringify(res.data))
            // console.log(JSON.stringify(this.offLevelPrices ))
              // that.getChannelProducts()
              // that.showProductDlg = false
              // this.$message.success('操作成功')
          }else{
              this.$message.success('查询渠道出账类型失败')
          }
      })
    },
    // removeChannelBillingFeeConfig
    okRemoveChannelFeeConfig:function(row){
      let that = this
      this.$confirm('您确认要此操作, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
      }).then(() => {
        let params = {}
        params.id = row.id
        apiBigflow.removeChannelBillingFeeConfig(params).then(res=>{
          if(res.resultCode == 0){
              that.getChannelBillingFeeConfigs()
              this.$message.success('操作成功')
          }else{
              this.$message.success('操作失败')
          }
      })
      }).catch(() => {
      });
    },
    // getChannelBillingFeeConfigs
    okRemoveProduct:function(row){
      let that = this
      this.$confirm('您确认要此操作, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
      }).then(() => {
        let params = {}
        params.id = row.id
        apiBigflow.removeChannelProductStatus(params).then(res=>{
          if(res.resultCode == 0){
              that.getChannelProducts()
              that.showProductDlg = false
              this.$message.success('操作成功')
          }else{
              this.$message.success('操作失败')
          }
      })
      }).catch(() => {
      });
    },
    okChangeProductStatus:function(row, optType){
      let that = this
      this.$confirm('您确认要此操作, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
      }).then(() => {
        let params = {}
        params.page = 1
        params.merchId = this.selecedChannelCode
        params.id = row.id
        params.proxyPdCode = row.id
        if(optType == 0){ //上架
          params.value = 1
          params.status = 1
        }else if(optType == 1){//下架
          params.value = 2
          params.status = 2
        }
        console.log(JSON.stringify(params))
        apiBigflow.changeChannelProductStatus(params).then(res=>{
          if(res.resultCode == 0){
              that.getChannelProducts()
              that.showProductDlg = false
              this.$message.success('操作成功')
          }else{
              this.$message.success('操作失败')
          }
      })
      }).catch(() => {
      });
      
    },
    okAddChannelProduct:function(){
      let that = this
      this.$confirm('您确认要此操作, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
      }).then(() => {
        let params = {}
        params.productCode = this.productForm.productCode
        params.status = this.productForm.status
        params.merchId = this.selecedChannelCode
        apiBigflow.addChannelProduct(params).then(res=>{
          if(res.resultCode == 0){
              that.getChannelProducts()
              that.showProductDlg = false
              this.$message.success('添加成功')
          }else{
              this.$message.success('添加失败')
          }
      })
      }).catch(() => {
      });
    },
    // 
    getProductCodes:function(){
      let params = {}
      apiBigflow.getProductCodes(params).then(res => {
        if (res.resultCode === 0) {
            this.productCodes = res.data
        } else {
          this.$message.error(res.resultInfo)
        }
      })
    },

    queryChannelProducts:function(){
      this.getChannelProducts()
    },
    getChannelProducts:function(){
      let params = {}
      params.page=this.productPage
      params.merchId = this.selecedChannelCode
      params.productCode = this.queryChannelProductForm.productCode
      apiBigflow.getChannelProducts(params).then(res => {
        if (res.resultCode === 0) {
            this.channelProducts = res.data
            this.productTotal = res.rowNum
        } else {
          this.$message.error(res.resultInfo)
        }
      })
    },
    tabSelect:function(tabType){
      this.selectedTab = tabType
    },
    okDistrubuteBetween:function(){
        if(this.distrubuteForm.channelId == undefined || this.distrubuteForm.channelId == '' || this.distrubuteForm.channelId == null){
            this.$message.error('渠道名必须填写')
            return
        }
        if(this.distrubuteForm.iccidStart == undefined || this.distrubuteForm.iccidStart == '' || this.distrubuteForm.iccidStart == null){
            this.$message.error('首iccd必须填写')
            return
        }
        if(this.distrubuteForm.iccidEnd == undefined || this.distrubuteForm.iccidEnd == '' || this.distrubuteForm.iccidEnd == null){
            this.$message.error('尾iccd必须填写')
            return
        }
        this.$confirm('您确认要此操作, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let params = {}
        params.channelId = this.distrubuteForm.channelId
        params.iccidStart = this.distrubuteForm.iccidStart
        params.iccidEnd = this.distrubuteForm.iccidEnd
        params.type = 1
        apiBigflow.distributeChannelCardsBetween(params).then(res => {
            if (res.resultCode === 0) {
                this.channelStocks = res.data
                this.total = res.rowNum
            } else {
            this.$message.error(res.resultInfo)
            }
        })
      }).catch(() => {
      });
    },
    hideDistrubuteBetween:function(){
        this.showDistrubuteDlg = false
    },
    showDistrubuteBetween:function(){
        this.showDistrubuteDlg = true
    },
    queryChannelCards:function(){
        this.getChannelStocks()
    },
    handleProductSizeChange:function(newSize){

    },
    // 监听 pagesize 改变的事件
    handleSizeChange (newSize) {
    //   this.queryChannelForm.pageSize = newSize
    //   this.getChannelList(localStorage.getItem('channelId'))
    },
    handleProductCurrentChange:function(newPage){
      this.productPage = newPage
      this.getChannelProducts()
    },
    // 监听 页码值 改变的事件
    handleCurrentChange (newPage) {
        this.page = newPage
        this.getChannelStocks()
    //   this.queryChannelForm.page = newPage - 1
    //   this.getChannelList(localStorage.getItem('channelId'))
    },
  
    getChannelStocks:function(){
      let params = {}
      params.page=this.page
      params.channelId = this.selecedChannelCode
      params.iccidLike = this.queryChannelCardForm.iccid
      params.phoneNumberLike = this.queryChannelCardForm.phone
      params.status = this.queryChannelCardForm.status
      params.type = 1
      apiBigflow.getChannelStocks(params).then(res => {
        if (res.resultCode === 0) {
            this.channelStocks = res.data
            this.total = res.rowNum
        } else {
          this.$message.error(res.resultInfo)
        }
      })

    },
    getChannels () {
      let params = {}
      params.page=1
      apiBigflow.getSaleChannels(params).then(res => {
        if (res.resultCode === 0) {
            this.channels = res.data
        } else {
          this.$message.error(res.resultInfo)
        }
      })
    },
    
    channelChick (channel) {
      // if(channel == undefined || channel=='')
      //   return 
      // this.selecedChannelCode = channel.channelId
      // this.getChannelProducts()

    },
    // // 点击 tree 从子组件 获取 对应的 渠道id
    getChannelId (channelsID, channelName) {
      this.channelBillingConfigForm = {}
        this.selecedChannelCode = channelsID
        this.selectedChannelName = channelName
        this.getChannelStocks()
        this.getChannelBillingFeeConfigs()
        this.getChannelProducts()
        this.getLbsChannelConfigs()
        // this.getSalePerson()
    }
  }
}
</script>

<style scoped>
.box_subject {
  box-sizing: border-box;
  padding: 10px 10px 0 10px;
}
.hoverQrcodeBox {
  width: 150px;
}
.hoverQrcodeBoxNo {
  text-align: center;
}
.tree-tab-unselected {
  display:inline-block;
  background:silver;
  color:white;
  margin: 5px;
  margin-top: 10px;
  padding: 5px;
  border-radius:5px;
  width: 100px;
  font-size: 5px;
  text-align: center;
  color:#145297;
  background-color: transparent;
  border-color: transparent;
}
.tree-selected {
  background:#6ab3fc;
  color: white;
}
.el-button {
  color:#145297;
    background-color: transparent;
    border-color: transparent;
}
.channel-name{
  font-size: 18px;
  margin: 10px;
  color: #145297;
}
</style>
