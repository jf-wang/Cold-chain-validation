using Aspose.Words;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Mail;
using System.Net.Sockets;
using System.Text;
using System.Web;
using System.Web.Http;
using System.Web.Security;


namespace TszzWSDWebAPI.Controllers
{ 
    public class YY15Controller : ApiController
    {
        #region 属性
        DataClasses1DataContext dc = new DataClasses1DataContext(ConfigurationManager.ConnectionStrings["DBConnectionString"].ConnectionString);
        static string smsuid = ConfigurationManager.AppSettings["smsuid"].ToString();
        static string smsusr = ConfigurationManager.AppSettings["smsusr"].ToString();
        static string smspwd = ConfigurationManager.AppSettings["smspwd"].ToString();
        static string ip = ConfigurationManager.AppSettings["ip"].ToString();
        static string port = ConfigurationManager.AppSettings["port"].ToString();
        static string sport = ConfigurationManager.AppSettings["sport"].ToString();
        #endregion

        [HttpPost]
        public string HelloWorld()
        {
            return "HelloWorld";
        }

        //登录
        [HttpPost]
        public string LOGIN()
        {
            try
            {
                string uid = HttpContext.Current.Request["uid"];
                string pwd = HttpContext.Current.Request["pwd"];
                string sql = "select * from v_yonghu where code='" + uid + "' and pwd='" + MD5(pwd) + "'";
                DataTable dt = SqlHelper.GetDataSet(sql).Tables[0];
                if (dt.Rows.Count == 1) return DataTable2Json(dt); else return "";
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }

        //项目总览
        [HttpPost]
        public string XMXZ()
        {
            try
            {
                string sql = "select *,'~/Mapsp/'+CONVERT(varchar,id) + '.jpg?t=' + CONVERT(varchar, GETDATE(), 120) AS url from xiangmu order by code";
                DataTable dt = SqlHelper.GetDataSet(sql).Tables[0];
                if (dt.Rows.Count > 0) return DataTable2Json(dt); else return "";
            }
            catch(Exception ex)
            {
                return ex.Message;
            }
        }

        //当前报警、未确认报警
        public string XMBJ()
        {
            try
            {
                string xmid = HttpContext.Current.Request["xmid"];
                string dqbj = SqlHelper.GetDataSet("select count(*) from v_canshuval where xmid=" + xmid + " and (zt<>'OK' or sbzt<>'OK')").Tables[0].Rows[0][0].ToString();
                string csbj = SqlHelper.GetDataSet("select count(*) from canshuarm where xmid=" + xmid + " and sfqr<>1").Tables[0].Rows[0][0].ToString();
                string sbbj = SqlHelper.GetDataSet("select count(*) from shebeiarm where xmid=" + xmid + " and sfqr<>1").Tables[0].Rows[0][0].ToString();
                return dqbj + "," + (Convert.ToInt32(csbj) + Convert.ToInt32(sbbj)).ToString();
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }

        //到期设备
        public string DQSB()
        {
            try
            {
                string xmid = HttpContext.Current.Request["xmid"];
                bool isWarning = false;
                int noWarning = 0;
                DataTable dtw = SqlHelper.GetDataSet("select sertimes from v_shebei where xmid=" + xmid).Tables[0];
                for (int i = 0; i < dtw.Rows.Count; i++)
                {
                    DateTime sertimes = Convert.ToDateTime(dtw.Rows[i]["sertimes"].ToString());
                    double tDays = (sertimes - DateTime.Now).TotalDays;
                    if (tDays <= 15)
                    {
                        isWarning = true;
                        noWarning++;
                    }
                }
                if (isWarning)
                {                    
                    return "有" + noWarning + "台设备服务期限将要到期！";
                }
                else
                {
                    return "";
                }
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }

        //项目管理
        [HttpPost]
        public string XMGET()
        {
            try
            {
                string where = "";

                //ID
                string id = HttpContext.Current.Request["id"];
                if (id != null) where += " and id =" + id;

                string sql = "select *,'~/Mapsp/' + CONVERT(varchar,id) + 's.jpg?t=' + CONVERT(varchar, GETDATE(), 120) AS img from xiangmu where 1=1 " + where + " order by code";
                DataTable dt = SqlHelper.GetDataSet(sql).Tables[0];
                if (dt.Rows.Count > 0) return DataTable2Json(dt); else return "";
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }
        [HttpPost]
        public string XMADD(XiangMu T)
        {
            try
            {
                T.money = 0;
                T.smsmoney = 0;
                T.lossshow = "--";
                T.homepage = "ssjk2";
                T.createtimes = DateTime.Now;
                dc.XiangMu.InsertOnSubmit(T);
                dc.SubmitChanges();
                return "1";
            }
            catch
            {
                return "0";
            }
        }
        [HttpPost]
        public string XMUPD(XiangMu T)
        {
            try
            {
                XiangMu T_ = (from s in dc.XiangMu where s.id == T.id select s).Single<XiangMu>();
                if (T.code != null) T_.code = T.code;
                if (T.name != null) T_.name = T.name;
                if (T.bz != null) T_.bz = T.bz;
                if (T.hisjg != null) T_.hisjg = T.hisjg;
                if (T.hisjgtimes != null) T_.hisjgtimes = T.hisjgtimes;
                if (T.hiszs != null) T_.hiszs = T.hiszs;
                if (T.hispay != null) T_.hispay = T.hispay;
                if (T.hispaytimes != null) T_.hispaytimes = T.hispaytimes;
                if (T.hissertimes != null) T_.hissertimes = T.hissertimes;                
                if (T.sbtongdao != null) T_.sbtongdao = T.sbtongdao;
                if (T.sbpay != null) T_.sbpay = T.sbpay;
                if (T.sendmsg != null) T_.sendmsg = T.sendmsg;
                if (T.sendmsgtels != null) T_.sendmsgtels = T.sendmsgtels; 
                if (T.sendyue != null) T_.sendyue = T.sendyue;
                if (T.sendyuetels != null) T_.sendyuetels = T.sendyuetels;               
                if (T.lossshow != null) T_.lossshow = T.lossshow;
                if (T.homepage != null) T_.homepage = T.homepage;                           
                dc.SubmitChanges();
                return "1";
            }
            catch
            {
                return "0";
            }
        }
        [HttpPost]
        public string XMDEL(XiangMu T)
        {
            try
            {
                XiangMu T_ = (from s in dc.XiangMu where s.id == T.id select s).Single<XiangMu>();
                dc.XiangMu.DeleteOnSubmit(T_);
                dc.SubmitChanges();
                return "1";
            }
            catch
            {
                return "0";
            }
        }

        //用户管理
        [HttpPost]
        public string VYHGET()
        {
            try
            {
                string where = "";
                //名称
                string name = HttpContext.Current.Request["name"];
                if (name != null) where += " and name like '%" + name + "%'";
                //级别
                string grade = HttpContext.Current.Request["grade"];
                if (grade != null) where += " and grade =" + grade;
                //权限
                string power = HttpContext.Current.Request["power"];
                if (power != null) where += " and power =" + power;
                //项目
                string xmid = HttpContext.Current.Request["xmid"];
                if (xmid != null) where += " and xmid =" + xmid;
                //部门
                string bmid = HttpContext.Current.Request["bmid"];
                if (bmid != null) where += " and bmid =" + bmid;
                //ID
                string id = HttpContext.Current.Request["id"];
                if (id != null) where += " and id =" + id;

                string sql = "select * from v_yonghu where 1=1 " + where + " order by name";
                DataTable dt = SqlHelper.GetDataSet(sql).Tables[0];
                if (dt.Rows.Count > 0) return DataTable2Json(dt); else return "";
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }
        [HttpPost]
        public string YHADD(YongHu T)
        {
            try
            {
                T.pwd = "0a113ef6b61820daa5611c870ed8d5ee";//888
                dc.YongHu.InsertOnSubmit(T);
                dc.SubmitChanges();
                return "1";
            }
            catch
            {
                return "0";
            }
        }
        [HttpPost]
        public string YHUPD(YongHu T)
        {
            try
            {
                YongHu T_ = (from s in dc.YongHu where s.id == T.id select s).Single<YongHu>();
                if (T.code != null) T_.code = T.code;
                if (T.name != null) T_.name = T.name;
                if (T.bz != null) T_.bz = T.bz;
                if (T.grade != null) T_.grade = T.grade;
                if (T.tel != null) T_.tel = T.tel;
                if (T.power != null) T_.power = T.power;               
                dc.SubmitChanges();
                return "1";
            }
            catch
            {
                return "0";
            }
        }
        [HttpPost]
        public string YHDEL(YongHu T)
        {
            try
            {
                YongHu T_ = (from s in dc.YongHu where s.id == T.id select s).Single<YongHu>();
                dc.YongHu.DeleteOnSubmit(T_);
                dc.SubmitChanges();
                return "1";
            }
            catch
            {
                return "0";
            }
        }

        //设备类型
        [HttpPost]
        public string VSBTGET()
        {
            try
            {
                string where = "";
                //名称
                string name = HttpContext.Current.Request["name"];
                if (name != null) where += " and name like '%" + name + "%'";               
                //项目
                string xmid = HttpContext.Current.Request["xmid"];
                if (xmid != null) where += " and xmid =" + xmid;
                //ID
                string id = HttpContext.Current.Request["id"];
                if (id != null) where += " and id =" + id;

                string sql = "select * from v_sbtype where 1=1 " + where + " order by code";
                DataTable dt = SqlHelper.GetDataSet(sql).Tables[0];
                if (dt.Rows.Count > 0) return DataTable2Json(dt); else return "";
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }
        [HttpPost]
        public string SBTADD(SheBeiType T)
        {
            try
            {
                dc.SheBeiType.InsertOnSubmit(T);
                dc.SubmitChanges();
                return "1";
            }
            catch
            {
                return "0";
            }
        }
        [HttpPost]
        public string SBTUPD(SheBeiType T)
        {
            try
            {
                SheBeiType T_ = (from s in dc.SheBeiType where s.id == T.id select s).Single<SheBeiType>();
                if (T.code != null) T_.code = T.code;
                if (T.name != null) T_.name = T.name;
                if (T.bz != null) T_.bz = T.bz;
                if (T.addr != null) T_.addr = T.addr;
                if (T.addn != null) T_.addn = T.addn;
                if (T.xmid != null) T_.xmid = T.xmid;
                dc.SubmitChanges();
                return "1";
            }
            catch
            {
                return "0";
            }
        }
        [HttpPost]
        public string SBTDEL(SheBeiType T)
        {
            try
            {
                SheBeiType T_ = (from s in dc.SheBeiType where s.id == T.id select s).Single<SheBeiType>();
                dc.SheBeiType.DeleteOnSubmit(T_);
                dc.SubmitChanges();
                return "1";
            }
            catch
            {
                return "0";
            }
        }

        //信号类型
        [HttpPost]
        public string VCSTGET()
        {
            try
            {
                string where = "";
                //名称
                string name = HttpContext.Current.Request["name"];
                if (name != null) where += " and name like '%" + name + "%'";
                //项目
                string xmid = HttpContext.Current.Request["xmid"];
                if (xmid != null) where += " and xmid =" + xmid;
                //ID
                string id = HttpContext.Current.Request["id"];
                if (id != null) where += " and id =" + id;

                string sql = "select * from v_cstype where 1=1 " + where + " order by code";
                DataTable dt = SqlHelper.GetDataSet(sql).Tables[0];
                if (dt.Rows.Count > 0) return DataTable2Json(dt); else return "";
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }
        [HttpPost]
        public string CSTADD(CanShuType T)
        {
            try
            {
                dc.CanShuType.InsertOnSubmit(T);
                dc.SubmitChanges();
                return "1";
            }
            catch
            {
                return "0";
            }
        }
        [HttpPost]
        public string CSTUPD(CanShuType T)
        {
            try
            {
                CanShuType T_ = (from s in dc.CanShuType where s.id == T.id select s).Single<CanShuType>();
                if (T.code != null) T_.code = T.code;
                if (T.name != null) T_.name = T.name;
                if (T.bz != null) T_.bz = T.bz;
                if (T.k != null) T_.k = T.k;
                if (T.b != null) T_.b = T.b;
                if (T.xmid != null) T_.xmid = T.xmid;
                if (T.mark != null) T_.mark = T.mark;
                if (T.rgb != null) T_.rgb = T.rgb;
                dc.SubmitChanges();
                return "1";
            }
            catch
            {
                return "0";
            }
        }
        [HttpPost]
        public string CSTDEL(CanShuType T)
        {
            try
            {
                CanShuType T_ = (from s in dc.CanShuType where s.id == T.id select s).Single<CanShuType>();
                dc.CanShuType.DeleteOnSubmit(T_);
                dc.SubmitChanges();
                return "1";
            }
            catch
            {
                return "0";
            }
        }

        //在线设备
        [HttpPost]
        public string SBDGET()
        {
            try
            {
                string where = "";
                //编号
                string code = HttpContext.Current.Request["code"];
                if (code != null) where += " and code like '%" + code + "%'";

                string sql = "select * from SheBeiData where 1=1 " + where + " order by code";
                DataTable dt = SqlHelper.GetDataSet(sql).Tables[0];
                if (dt.Rows.Count > 0) return DataTable2Json(dt); else return "";
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }

        //修改密码
        [HttpPost]
        public string XGMM()
        {
            try
            {
                string id = HttpContext.Current.Request["id"];
                string pwd1 = HttpContext.Current.Request["pwd1"];
                string pwd2 = HttpContext.Current.Request["pwd2"];
                string sql = "update yonghu set pwd='" + pwd2 + "' where code<>'admin' and id=" + id + " and pwd='" + pwd1 + "'";
                if (SqlHelper.exesql(sql)) return "1"; else return "0";
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }

        //提取参数
        [HttpPost]
        public string TQCS()
        {
            string code = HttpContext.Current.Request["code"];
            string ip = HttpContext.Current.Request["ip"];
            string port = HttpContext.Current.Request["port"];

            UdpClient udpClient = new UdpClient(999);
            try
            {
                byte[] data = new byte[10];
                data[0] = 0x63;
                data[1] = 0x6f;
                data[2] = 0x6d;
                data[3] = 0x31;
                data[4] = byte.Parse(Convert.ToInt32(code.Substring(0, 2), 16).ToString());
                data[5] = byte.Parse(Convert.ToInt32(code.Substring(2, 2), 16).ToString());
                data[6] = byte.Parse(Convert.ToInt32(code.Substring(4, 2), 16).ToString());
                data[7] = byte.Parse(Convert.ToInt32(code.Substring(6, 2), 16).ToString());
                data[8] = byte.Parse(Convert.ToInt32(code.Substring(8, 2), 16).ToString());
                data[9] = byte.Parse(Convert.ToInt32(code.Substring(10, 2), 16).ToString());
                IPEndPoint endPoint = new IPEndPoint(GetIPAddress(ip), Convert.ToInt32(port));
                udpClient.Send(data, data.Length, endPoint);
                return "1";
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
            finally
            {
                udpClient.Close();
            }
        }

        //设置参数
        [HttpPost]
        public string SZCS()
        {
            string code = HttpContext.Current.Request["code"];
            string ip = HttpContext.Current.Request["ip"];
            string port = HttpContext.Current.Request["port"];
            string apn = HttpContext.Current.Request["apn"];
            string jg = HttpContext.Current.Request["jg"];
            string wg = HttpContext.Current.Request["wg"];
            string s1 = HttpContext.Current.Request["s1"];
            string s2 = HttpContext.Current.Request["s2"];
            string s3 = HttpContext.Current.Request["s3"];
            string s4 = HttpContext.Current.Request["s4"];
           
            UdpClient udpClient = new UdpClient(999);

            try
            {
                byte[] SendStr = new byte[517];
                for (int def = 0; def < 517; def++)
                {
                    SendStr[def] = 0xff;
                }
                SendStr[0] = 0x63;
                SendStr[1] = 0x6f;
                SendStr[2] = 0x6d;
                SendStr[3] = 0x30;
                byte[] APN = Encoding.Default.GetBytes(apn);
                SendStr[104 + 4] = byte.Parse(APN.Length.ToString());//APN数量
                for (int i = 0; i < SendStr[104 + 4]; i++)//APN内容
                {
                    SendStr[50 + i + 4] = APN[i];
                }
                SendStr[65 + 4] = byte.Parse(Convert.ToInt32(code.Substring(0, 2), 16).ToString());
                SendStr[66 + 4] = byte.Parse(Convert.ToInt32(code.Substring(2, 2), 16).ToString());
                SendStr[67 + 4] = byte.Parse(Convert.ToInt32(code.Substring(4, 2), 16).ToString());
                SendStr[68 + 4] = byte.Parse(Convert.ToInt32(code.Substring(6, 2), 16).ToString());
                SendStr[69 + 4] = byte.Parse(Convert.ToInt32(code.Substring(8, 2), 16).ToString());
                SendStr[70 + 4] = byte.Parse(Convert.ToInt32(code.Substring(10, 2), 16).ToString());//本机编号
                string strInterval = Convert10t16(int.Parse(jg)).PadLeft(4, '0');
                SendStr[106 + 4] = byte.Parse(Convert.ToInt32(strInterval.Substring(0, 2), 16).ToString());
                SendStr[107 + 4] = byte.Parse(Convert.ToInt32(strInterval.Substring(2, 2), 16).ToString());//主动上报时间间隔
                SendStr[92 + 4] = byte.Parse(Convert.ToInt32(wg).ToString());//外挂模块数量

                if (s1 != null)//服务器1
                {
                    SendStr[101 + 4] = 0x01;
                    string Server = s1;
                    byte[] serverByte = Encoding.Default.GetBytes(Server);
                    SendStr[105 + 4] = byte.Parse(serverByte.Length.ToString());
                    for (int i = 0; i < serverByte.Length; i++) SendStr[4 + 00 + i] = serverByte[i];
                }
                else
                {
                    SendStr[101 + 4] = 0x00;
                }
                if (s2 != null)//服务器2
                {
                    SendStr[101 + 4 + 128] = 0x01;
                    string Server = s2;
                    byte[] serverByte = Encoding.Default.GetBytes(Server);
                    SendStr[105 + 4 + 128] = byte.Parse(serverByte.Length.ToString());
                    for (int i = 0; i < serverByte.Length; i++) SendStr[4 + 00 + i + 128] = serverByte[i];
                }
                else
                {
                    SendStr[101 + 4 + 128] = 0x00;
                }
                if (s3 != null)//服务器3
                {
                    SendStr[101 + 4 + 128 * 2] = 0x01;
                    string Server = s3;
                    byte[] serverByte = Encoding.Default.GetBytes(Server);
                    SendStr[105 + 4 + 128 * 2] = byte.Parse(serverByte.Length.ToString());
                    for (int i = 0; i < serverByte.Length; i++) SendStr[4 + 00 + i + 128 * 2] = serverByte[i];
                }
                else
                {
                    SendStr[101 + 4 + 128 * 2] = 0x00;
                }
                if (s4 != null)//服务器4
                {
                    SendStr[101 + 4 + 128 * 3] = 0x01;
                    string Server = s4;
                    byte[] serverByte = Encoding.Default.GetBytes(Server);
                    SendStr[105 + 4 + 128 * 3] = byte.Parse(serverByte.Length.ToString());
                    for (int i = 0; i < serverByte.Length; i++) SendStr[4 + 00 + i + 128 * 3] = serverByte[i];
                }
                else
                {
                    SendStr[101 + 4 + 128 * 3] = 0x00;
                }
                SendStr[516] = XOR(SendStr, 516);
                IPEndPoint endPoint = new IPEndPoint(GetIPAddress(ip), Convert.ToInt32(port));
                udpClient.Send(SendStr, SendStr.Length, endPoint);
                return "1";
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
            finally
            {
                udpClient.Close();
            }           
        }

        //温度修正
        [HttpPost]
        public string WDXZ()
        {
            string code = HttpContext.Current.Request["code"];
            string ip = HttpContext.Current.Request["ip"];
            string port = HttpContext.Current.Request["port"];
            string x1 = HttpContext.Current.Request["x1"];
            string x2 = HttpContext.Current.Request["x2"];
            string x3 = HttpContext.Current.Request["x3"];
            string x4 = HttpContext.Current.Request["x4"];
            string x5 = HttpContext.Current.Request["x5"];
            string x6 = HttpContext.Current.Request["x6"];

            UdpClient udpClient = new UdpClient(999);

            try
            {
                byte[] data = new byte[17];

                data[0] = 0x63;
                data[1] = 0x6f;
                data[2] = 0x6d;
                data[3] = 0x39;

                double xz1 = Convert.ToDouble(x1);
                double xz2 = Convert.ToDouble(x2);
                double xz3 = Convert.ToDouble(x3);
                double xz4 = Convert.ToDouble(x4);
                double xz5 = Convert.ToDouble(x5);
                double xz6 = Convert.ToDouble(x6);

                if (xz1 < 0) data[4] = (byte)((int)(Math.Abs(xz1) * 10) + 100); else data[4] = (byte)(int)(xz1 * 10);
                if (xz2 < 0) data[5] = (byte)((int)(Math.Abs(xz2) * 10) + 100); else data[5] = (byte)(int)(xz2 * 10);
                if (xz3 < 0) data[6] = (byte)((int)(Math.Abs(xz3) * 10) + 100); else data[6] = (byte)(int)(xz3 * 10);
                if (xz4 < 0) data[7] = (byte)((int)(Math.Abs(xz4) * 10) + 100); else data[7] = (byte)(int)(xz4 * 10);
                if (xz5 < 0) data[8] = (byte)((int)(Math.Abs(xz5) * 10) + 100); else data[8] = (byte)(int)(xz5 * 10);
                if (xz6 < 0) data[9] = (byte)((int)(Math.Abs(xz6) * 10) + 100); else data[9] = (byte)(int)(xz6 * 10);

                data[10] = (byte)(data[0] ^ data[1] ^ data[2] ^ data[3] ^ data[4] ^ data[5] ^ data[6] ^ data[7] ^ data[8] ^ data[9]);

                data[11] = byte.Parse(Convert.ToInt32(code.Substring(0, 2), 16).ToString());
                data[12] = byte.Parse(Convert.ToInt32(code.Substring(2, 2), 16).ToString());
                data[13] = byte.Parse(Convert.ToInt32(code.Substring(4, 2), 16).ToString());
                data[14] = byte.Parse(Convert.ToInt32(code.Substring(6, 2), 16).ToString());
                data[15] = byte.Parse(Convert.ToInt32(code.Substring(8, 2), 16).ToString());
                data[16] = byte.Parse(Convert.ToInt32(code.Substring(10, 2), 16).ToString());

                IPEndPoint endPoint = new IPEndPoint(GetIPAddress(ip), Convert.ToInt32(port));

                udpClient.Send(data, data.Length, endPoint);

                return "1";
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
            finally
            {
                udpClient.Close();
            }
        }       

        //监控点管理
        [HttpPost]
        public string VJKDGET()
        {
            try
            {
                string where = "";

                //项目
                string xmid = HttpContext.Current.Request["xmid"];
                if (xmid != null) where += " and xmid =" + xmid;

                //部门
                string bmid = HttpContext.Current.Request["bmid"];
                if (bmid != null) where += " and bmid =" + bmid;

                //ID
                string id = HttpContext.Current.Request["id"];
                if (id != null) where += " and id =" + id;

                string sql = "select * from v_jiankongdian where 1=1 " + where + " order by code";
                DataTable dt = SqlHelper.GetDataSet(sql).Tables[0];
                if (dt.Rows.Count > 0) return DataTable2Json(dt); else return "";
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }
        [HttpPost]
        public string JKDGET()
        {
            try
            {
                string where = "";

                //项目
                string xmid = HttpContext.Current.Request["xmid"];
                if (xmid != null) where += " and xmid =" + xmid;

                //部门
                string bmid = HttpContext.Current.Request["bmid"];
                if (bmid != null) where += " and bmid =" + bmid;

                //ID
                string id = HttpContext.Current.Request["id"];
                if (id != null) where += " and id =" + id;

                string sql = "select * from jiankongdian where 1=1 " + where + " order by code";
                DataTable dt = SqlHelper.GetDataSet(sql).Tables[0];
                if (dt.Rows.Count > 0) return DataTable2Json(dt); else return "";
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }
        [HttpPost]
        public string JKDADD(JianKongDian T)
        {
            try
            {
                dc.JianKongDian.InsertOnSubmit(T);
                dc.SubmitChanges();
                return "1";
            }
            catch
            {
                return "0";
            }
        }
        [HttpPost]
        public string JKDUPD(JianKongDian T)
        {
            try
            {
                JianKongDian T_ = (from s in dc.JianKongDian where s.id == T.id select s).Single<JianKongDian>();
                if (T.code != null) T_.code = T.code;
                if (T.name != null) T_.name = T.name;
                if (T.xmid != null) T_.xmid = T.xmid;
                if (T.bz != null) T_.bz = T.bz;
                if (T.bmid != null) T_.bmid = T.bmid;
                if (T.url != null) T_.url = T.url;
                if (T.center != null) T_.center = T.center;
                if (T.zoom != null) T_.zoom = T.zoom;
                if (T.x != null) T_.x = T.x;
                if (T.y != null) T_.y = T.y;
                if (T.lng != null) T_.lng = T.lng;
                if (T.lat != null) T_.lat = T.lat;
                if (T.imgw != null) T_.imgw = T.imgw;
                if (T.imgh != null) T_.imgh = T.imgh;
                if (T.area != null) T_.area = T.area;
                dc.SubmitChanges();
                return "1";
            }
            catch
            {
                return "0";
            }
        }
        [HttpPost]
        public string JKDDEL(JianKongDian T)
        {
            try
            {
                JianKongDian T_ = (from s in dc.JianKongDian where s.id == T.id select s).Single<JianKongDian>();
                dc.JianKongDian.DeleteOnSubmit(T_);
                dc.SubmitChanges();
                return "1";
            }
            catch
            {
                return "0";
            }
        }

        //部门管理
        [HttpPost]
        public string BMGET()
        {
            try
            {
                string where = "";

                //项目
                string xmid = HttpContext.Current.Request["xmid"];
                if (xmid != null) where += " and xmid =" + xmid;

                //ID
                string id = HttpContext.Current.Request["id"];
                if (id != null) where += " and id =" + id;

                string sql = "select * from bumen where 1=1 " + where + " order by code";
                DataTable dt = SqlHelper.GetDataSet(sql).Tables[0];
                if (dt.Rows.Count > 0) return DataTable2Json(dt); else return "";
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }
        [HttpPost]
        public string BMADD(BuMen T)
        {
            try
            {
                dc.BuMen.InsertOnSubmit(T);
                dc.SubmitChanges();
                return "1";
            }
            catch 
            {
                return "0"; 
            }
        }
        [HttpPost]
        public string BMUPD(BuMen T)
        {
            try
            {
                BuMen T_ = (from s in dc.BuMen where s.id == T.id select s).Single<BuMen>();
                if (T.code != null) T_.code = T.code;
                if (T.name != null) T_.name = T.name;
                if (T.xmid != null) T_.xmid = T.xmid;
                if (T.bz != null) T_.bz = T.bz;
                if (T.sendmsg != null) T_.sendmsg = T.sendmsg;
                if (T.sendmsgtels != null) T_.sendmsgtels = T.sendmsgtels;
                if (T.center != null) T_.center = T.center;
                if (T.zoom != null) T_.zoom = T.zoom;
                if (T.areaid != null) T_.areaid = T.areaid;
                if (T.lng != null) T_.lng = T.lng;
                if (T.lat != null) T_.lat = T.lat;
                if (T.imgw != null) T_.imgw = T.imgw;
                if (T.imgh != null) T_.imgh = T.imgh;
                dc.SubmitChanges();
                return "1";
            }
            catch
            {
                return "0";
            }
        }
        [HttpPost]
        public string BMDEL(BuMen T)
        {
            try
            {
                BuMen T_ = (from s in dc.BuMen where s.id == T.id select s).Single<BuMen>();
                dc.BuMen.DeleteOnSubmit(T_);
                dc.SubmitChanges();
                return "1";
            }
            catch
            {
                return "0";
            }
        }

        //设备管理
        [HttpPost]
        public string VSBGET()
        {
            try
            {
                string where = "";

                //项目
                string xmid = HttpContext.Current.Request["xmid"];
                if (xmid != null) where += " and xmid =" + xmid;
                //项目
                string bmid = HttpContext.Current.Request["bmid"];
                if (bmid != null) where += " and bmid =" + bmid;
                //ID
                string id = HttpContext.Current.Request["id"];
                if (id != null) where += " and id =" + id;

                string sql = "select * from v_shebei where 1=1 " + where + " order by code";
                DataTable dt = SqlHelper.GetDataSet(sql).Tables[0];
                if (dt.Rows.Count > 0) return DataTable2Json(dt); else return "";
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }
        [HttpPost]
        public string SBGET()
        {
            try
            {
                string where = "";

                //项目
                string xmid = HttpContext.Current.Request["xmid"];
                if (xmid != null) where += " and xmid =" + xmid;
                //项目
                string bmid = HttpContext.Current.Request["bmid"];
                if (bmid != null) where += " and bmid =" + bmid;
                //ID
                string id = HttpContext.Current.Request["id"];
                if (id != null) where += " and id =" + id;

                string sql = "select * from shebei where 1=1 " + where + " order by code";
                DataTable dt = SqlHelper.GetDataSet(sql).Tables[0];
                if (dt.Rows.Count > 0) return DataTable2Json(dt); else return "";
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }
        [HttpPost]
        public string SBADD(SheBei T)
        {
            try
            {
                dc.SheBei.InsertOnSubmit(T);
                dc.SubmitChanges();
                return "1";
            }
            catch
            {
                return "0";
            }
        }
        [HttpPost]
        public string SBUPD(SheBei T)
        {
            try
            {
                SheBei T_ = (from s in dc.SheBei where s.id == T.id select s).Single<SheBei>();
                if (T.code != null) T_.code = T.code;
                if (T.name != null) T_.name = T.name;                
                if (T.bz != null) T_.bz = T.bz;
                if (T.bmid != null) T_.bmid = T.bmid;
                if (T.datacnt != null) T_.datacnt = T.datacnt;
                if (T.isback != null) T_.isback = T.isback;
                if (T.tongdao != null) T_.tongdao = T.tongdao;
                if (T.pay != null) T_.pay = T.pay;
                if (T.paytimes != null) T_.paytimes = T.paytimes;
                if (T.sertimes != null) T_.sertimes = T.sertimes;
                if (T.x != null) T_.x = T.x;
                if (T.y != null) T_.y = T.y;
                if (T.lxbj != null) T_.lxbj = T.lxbj;
                if (T.canshudata != null) T_.canshudata = T.canshudata;
                if (T.canshudatetime != null) T_.canshudatetime = T.canshudatetime;
                if (T.xinghao != null) T_.xinghao = T.xinghao;
                if (T.sbtypeid != null) T_.sbtypeid = T.sbtypeid;
                dc.SubmitChanges();
                return "1";
            }
            catch
            {
                return "0";
            }
        }
        [HttpPost]
        public string SBDEL(SheBei T)
        {
            try
            {
                SheBei T_ = (from s in dc.SheBei where s.id == T.id select s).Single<SheBei>();
                dc.SheBei.DeleteOnSubmit(T_);
                dc.SubmitChanges();
                return "1";
            }
            catch
            {
                return "0";
            }
        }

        //参数管理        
        [HttpPost]
        public string CSGET()
        {
            try
            {
                string where = "";
                
                //设备
                string sbid = HttpContext.Current.Request["sbid"];
                if (sbid != null) where += " and sbid =" + sbid;
                //ID
                string id = HttpContext.Current.Request["id"];
                if (id != null) where += " and id =" + id;

                string sql = "select * from canshu where 1=1 " + where + " order by code";
                DataTable dt = SqlHelper.GetDataSet(sql).Tables[0];
                if (dt.Rows.Count > 0) return DataTable2Json(dt); else return "";
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }
        [HttpPost]
        public string VCSGET()
        {
            try
            {
                string where = "";

                //项目
                string xmid = HttpContext.Current.Request["xmid"];
                if (xmid != null) where += " and xmid =" + xmid;
                //部门
                string bmid = HttpContext.Current.Request["bmid"];
                if (bmid != null) where += " and bmid =" + bmid;
                //监控点
                string jkdid = HttpContext.Current.Request["jkdid"];
                if (jkdid != null) where += " and jkdid =" + jkdid;
                //设备
                string sbid = HttpContext.Current.Request["sbid"];
                if (sbid != null) where += " and sbid =" + sbid;
                //ID
                string id = HttpContext.Current.Request["id"];
                if (id != null) where += " and id =" + id;

                string sql = "select * from v_canshu where 1=1 " + where + " order by code";
                DataTable dt = SqlHelper.GetDataSet(sql).Tables[0];
                if (dt.Rows.Count > 0) return DataTable2Json(dt); else return "";
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }
        [HttpPost]
        public string VCSVGET()
        {
            try
            {
                string where = "";

                //项目
                string xmid = HttpContext.Current.Request["xmid"];
                if (xmid != null) where += " and xmid =" + xmid;
                //部门
                string bmid = HttpContext.Current.Request["bmid"];
                if (bmid != null) where += " and bmid =" + bmid;
                //监控点
                string jkdid = HttpContext.Current.Request["jkdid"];
                if (jkdid != null) where += " and jkdid =" + jkdid;
                //设备
                string sbid = HttpContext.Current.Request["sbid"];
                if (sbid != null) where += " and sbid =" + sbid;
                //ID
                string id = HttpContext.Current.Request["id"];
                if (id != null) where += " and id =" + id;
                //是否启用
                string qy = HttpContext.Current.Request["qy"];
                if (qy != null) where += " and qy =" + qy;

                string sql = "select * from v_canshuval where 1=1 " + where + " order by code";
                DataTable dt = SqlHelper.GetDataSet(sql).Tables[0];
                if (dt.Rows.Count > 0) return DataTable2Json(dt); else return "";
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }
        [HttpPost]
        public string CSADD(CanShu T)
        {
            try
            {
                dc.CanShu.InsertOnSubmit(T);
                dc.SubmitChanges();
                return "1";
            }
            catch
            {
                return "0";
            }
        }
        [HttpPost]
        public string CSUPD(CanShu T)
        {
            try
            {
                CanShu T_ = (from s in dc.CanShu where s.id == T.id select s).Single<CanShu>();
                if (T.code != null) T_.code = T.code;
                if (T.name != null) T_.name = T.name;
                if (T.unit != null) T_.unit = T.unit;
                if (T.sbid != null) T_.sbid = T.sbid;
                if (T.addr != null) T_.addr = T.addr;
                if (T.addn != null) T_.addn = T.addn;
                if (T.type != null) T_.type = T.type;
                if (T.cstypeid != null) T_.cstypeid = T.cstypeid;
                if (T.min != null) T_.min = T.min;
                if (T.max != null) T_.max = T.max;
                if (T.k != null) T_.k = T.k;
                if (T.b != null) T_.b = T.b;
                if (T.weizhi != null) T_.weizhi = T.weizhi;
                if (T.yongtu != null) T_.yongtu = T.yongtu;
                if (T.sdTemp != null) T_.sdTemp = T.sdTemp;
                if (T.sxTemp != null) T_.sxTemp = T.sxTemp;
                if (T.xxTemp != null) T_.xxTemp = T.xxTemp;
                if (T.qy != null) T_.qy = T.qy;
                if (T.qybj != null) T_.qybj = T.qybj;
                if (T.bjyc != null) T_.bjyc = T.bjyc;
                if (T.qydx != null) T_.qydx = T.qydx;
                if (T.txzt != null) T_.txzt = T.txzt;
                if (T.posIndex != null) T_.posIndex = T.posIndex;
                if (T.jkdid != null) T_.jkdid = T.jkdid;
                if (T.showxx != null) T_.showxx = T.showxx;
                if (T.showbc != null) T_.showbc = T.showbc;
                if (T.outval != null) T_.outval = T.outval;
                if (T.x != null) T_.x = T.x;
                if (T.y != null) T_.y = T.y;
                if (T.pl != null) T_.pl = T.pl;
                if (T.pltype != null) T_.pltype = T.pltype;
                if (T.isShow != null) T_.isShow = T.isShow;
                if (T.suf != null) T_.suf = T.suf;
                dc.SubmitChanges();
                return "1";
            }
            catch
            {
                return "0";
            }
        }
        [HttpPost]
        public string CSDEL(CanShu T)
        {
            try
            {
                CanShu T_ = (from s in dc.CanShu where s.id == T.id select s).Single<CanShu>();
                dc.CanShu.DeleteOnSubmit(T_);
                dc.SubmitChanges();
                return "1";
            }
            catch
            {
                return "0";
            }
        }

        //参数状态管理
        [HttpPost]
        public string CSSGET()
        {
            try
            {
                string where = "";

                //参数
                string csid = HttpContext.Current.Request["csid"];
                if (csid != null) where += " and csid =" + csid;
                //ID
                string id = HttpContext.Current.Request["id"];
                if (id != null) where += " and id =" + id;

                string sql = "select * from canshushow where 1=1 " + where + " order by code";
                DataTable dt = SqlHelper.GetDataSet(sql).Tables[0];
                if (dt.Rows.Count > 0) return DataTable2Json(dt); else return "";
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }
        [HttpPost]
        public string CSSADD(CanShuShow T)
        {
            try
            {
                dc.CanShuShow.InsertOnSubmit(T);
                dc.SubmitChanges();
                return "1";
            }
            catch
            {
                return "0";
            }
        }
        [HttpPost]
        public string CSSUPD(CanShuShow T)
        {
            try
            {
                CanShuShow T_ = (from s in dc.CanShuShow where s.id == T.id select s).Single<CanShuShow>();
                if (T.code != null) T_.code = T.code;
                if (T.name != null) T_.name = T.name;
                if (T.csid != null) T_.csid = T.csid;               
                if (T.min != null) T_.min = T.min;
                if (T.max != null) T_.max = T.max;
                if (T.url != null) T_.url = T.url;
                if (T.bz != null) T_.bz = T.bz;
                if (T.rgb != null) T_.rgb = T.rgb;
                if (T.suf != null) T_.suf = T.suf;
                if (T.outval != null) T_.outval = T.outval;
                if (T.isImg != null) T_.isImg = T.isImg;
                if (T.btnWidth != null) T_.btnWidth = T.btnWidth;
                if (T.btnHeight != null) T_.btnHeight = T.btnHeight;
                if (T.suf != null) T_.suf = T.suf;
                if (T.wDist != null) T_.wDist = T.wDist;
                if (T.hDist != null) T_.hDist = T.hDist;
                if (T.imgWidth != null) T_.imgWidth = T.imgWidth;
                if (T.imgHeight != null) T_.imgHeight = T.imgHeight;
                dc.SubmitChanges();
                return "1";
            }
            catch
            {
                return "0";
            }
        }
        [HttpPost]
        public string CSSDEL(CanShuShow T)
        {
            try
            {
                CanShuShow T_ = (from s in dc.CanShuShow where s.id == T.id select s).Single<CanShuShow>();
                dc.CanShuShow.DeleteOnSubmit(T_);
                dc.SubmitChanges();
                return "1";
            }
            catch
            {
                return "0";
            }
        }

        //GPS
        [HttpPost]
        public string GETJWD()
        {
            try
            {
                string id = HttpContext.Current.Request["id"];
                string tp = HttpContext.Current.Request["tp"];
                string date = HttpContext.Current.Request["date"];

                string sdate = date + " 00:00:00";
                string edate = date + " 23:59:59";

                string result = "";

                string sql = "";

                if (tp == "1")
                {
                    sql = "select dt2,jwd from sb_jwd where id=" + id + " and dt between '" + sdate + "' and '" + edate + "' order by dt2";
                }
                else
                {
                    sql = "select max(dt2) as dt2,jwd from sb_jwd where id=" + id + " and dt2 between '" + sdate + "' and '" + edate + "' group by jwd order by max(dt2)";
                }
                DataTable dt = SqlHelper.GetDataSet(sql).Tables[0];

                if (dt.Rows.Count > 0)
                {
                    for (int i = 0; i < dt.Rows.Count; i++)
                    {
                        result += dt.Rows[i]["jwd"].ToString() + "%" + dt.Rows[i]["dt2"].ToString() + "&";
                    }
                    result = result.Remove(result.Length - 1, 1);
                }

                return result;
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }
        [HttpPost]
        public string GETJWDS()
        {
            try
            {
                string str = HttpContext.Current.Request["str"];

                str = str.Remove(str.Length - 1, 1);

                string result = "";

                string[] ids = str.Split(',');

                for (int i = 0; i < ids.Length; i++)
                {
                    string sql = "select top 1 b.name,a.jwd,a.dt2 from sb_jwd a inner join shebei b on a.id=b.id where a.id = " + ids[i] + " order by a.dt2 desc";

                    DataTable dt = SqlHelper.GetDataSet(sql).Tables[0];

                    if (dt.Rows.Count == 1)
                    {
                        result += dt.Rows[0]["name"].ToString() + "%" + dt.Rows[0]["jwd"].ToString() + "%" + dt.Rows[0]["dt2"].ToString() + "&";
                    }
                }

                result = result.Remove(result.Length - 1, 1);

                return result;
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }
        [HttpPost]
        public string GETJWDSA()
        {
            try
            {
                string str = HttpContext.Current.Request["str"];

                str = str.Remove(str.Length - 1, 1);

                string[] bmids = str.Split(',');

                string result = "";

                for (int i = 0; i < bmids.Length; i++)
                {
                    string sql = "select id from shebei where bmid=" + bmids[i];

                    DataTable dt = SqlHelper.GetDataSet(sql).Tables[0];

                    if (dt.Rows.Count > 0)
                    {
                        for (int k = 0; k < dt.Rows.Count; k++)
                        {
                            string sql2 = "select top 1 b.name,a.jwd,a.dt2 from sb_jwd a inner join shebei b on a.id=b.id where a.id = " + dt.Rows[k]["id"].ToString() + " order by a.dt2 desc";

                            DataTable dt2 = SqlHelper.GetDataSet(sql2).Tables[0];

                            if (dt2.Rows.Count == 1)
                            {
                                result += dt2.Rows[0]["name"].ToString() + "%" + dt2.Rows[0]["jwd"].ToString() + "%" + dt2.Rows[0]["dt2"].ToString() + "&";
                            }
                        }
                    }
                }

                result = result.Remove(result.Length - 1, 1);

                return result;
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }

        //报警记录
        [HttpPost]
        public string BJJL()
        {
            try
            {                
                string xmid = HttpContext.Current.Request["xmid"];

                string sdate = HttpContext.Current.Request["sdate"];
                string edate = HttpContext.Current.Request["edate"];                

                string where1 = " and stimes between Convert(datetime,'" + sdate + "') and  Convert(datetime,'" + edate + "') ";
                string where2 = " and stimes between Convert(datetime,'" + sdate + "') and  Convert(datetime,'" + edate + "') ";

                //部门
                string bmid = HttpContext.Current.Request["bmid"];
                if (bmid != null)
                {
                    where1 += " and bmid =" + bmid;
                    where2 += " and bmid =" + bmid;
                }

                //设备
                string sbid = HttpContext.Current.Request["sbid"];
                if (sbid != null)
                {
                    where1 += " and sbid =" + sbid;
                    where2 += " and sbid =" + sbid;
                }

                //参数
                string csid = HttpContext.Current.Request["csid"];
                if (csid != null)
                {
                    where1 += " and id2 =" + csid;
                    where2 += " and 1=2";
                }

                string sql = " select '参数' as tp,* from v_canshuarm where xmid=" + xmid + where1
                           + " union "
                           + " select '设备' as tp,* from v_shebeiarm where xmid=" + xmid + where2
                           + " order by stimes desc ";

                DataTable dt = SqlHelper.GetDataSet(sql).Tables[0];
                if (dt.Rows.Count > 0) return DataTable2Json(dt); else return "";
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }

        //操作记录
        [HttpPost]
        public string CZJL()
        {
            try
            {
                string xmid = HttpContext.Current.Request["xmid"];

                string sdate = HttpContext.Current.Request["sdate"];
                string edate = HttpContext.Current.Request["edate"];

                string where = " and times between Convert(datetime,'" + sdate + "') and  Convert(datetime,'" + edate + "') ";

                //部门
                string bmid = HttpContext.Current.Request["bmid"];
                if (bmid != null) where += " and bmid =" + bmid;

                string sql = " select * from v_czrz where xmid=" + xmid + where + " order by times desc";
                DataTable dt = SqlHelper.GetDataSet(sql).Tables[0];
                if (dt.Rows.Count > 0) return DataTable2Json(dt); else return "";
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }

        //短信记录
        [HttpPost]
        public string DXJL()
        {
            try
            {
                string xmid = HttpContext.Current.Request["xmid"];

                string sdate = HttpContext.Current.Request["sdate"];
                string edate = HttpContext.Current.Request["edate"];

                string where = " and times between Convert(datetime,'" + sdate + "') and  Convert(datetime,'" + edate + "') ";

                string sql = "select * from SmsHis where xmid=" + xmid + where + " order by times desc";
                DataTable dt = SqlHelper.GetDataSet(sql).Tables[0];
                if (dt.Rows.Count > 0) return DataTable2Json(dt); else return "";
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }

        //存缴记录
        [HttpPost]
        public string CJJL()
        {
            try
            {
                string xmid = HttpContext.Current.Request["xmid"];

                string sdate = HttpContext.Current.Request["sdate"];
                string edate = HttpContext.Current.Request["edate"];

                string where = " and paytimes between Convert(datetime,'" + sdate + "') and  Convert(datetime,'" + edate + "') ";

                string sql = " select * from v_payhis where xmid=" + xmid + where + " order by paytimes desc";

                DataTable dt = SqlHelper.GetDataSet(sql).Tables[0];
                if (dt.Rows.Count > 0) return DataTable2Json(dt); else return "";
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }

        //实时数据、曲线
        public string CSCGET()
        {
            try
            {
                string id = HttpContext.Current.Request["id"];
                string sql = "select * from canshucur where id=" + id + " order by updatetime desc";
                DataTable dt = SqlHelper.GetDataSet(sql).Tables[0];
                if (dt.Rows.Count > 0) return DataTable2Json(dt); else return "";
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }

        //历史数据、曲线
        public string CSHGET()
        {
            try
            {
                string id = HttpContext.Current.Request["id"];
                string sdate = HttpContext.Current.Request["sdate"];
                string edate = HttpContext.Current.Request["edate"];

                string sql = " select * from canshuhis where id=" + id + " and updatetime between" +
                             " cast('" + sdate + "' as datetime) and cast('" + edate + "' as datetime) order by updatetime desc";

                DataTable dt = SqlHelper.GetDataSet(sql).Tables[0];
                if (dt.Rows.Count > 0) return DataTable2Json(dt); else return "";
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }

        //标准日报表（数据）
        public string RPTBZRBB()
        {
            try
            {
                string bmid = HttpContext.Current.Request["bmid"];
                string date = HttpContext.Current.Request["date"];

                string sql = @"select a.id,a.name as icename,
                Convert(decimal(18,2),b.t1) as t1,
                Convert(decimal(18,2),c.t2) as t2,
                Convert(decimal(18,2),d.t3) as t3,
                Convert(decimal(18,2),e.t4) as t4,
                Convert(decimal(18,2),f.t5) as t5,
                Convert(decimal(18,2),g.t6) as t6 from v_canshu a 
                left join (
                select a.id,a.name,a.val as [t1] from canshuhis a  inner join 
                (select id,min(updatetime) as updatetime from canshuhis 
                where bmid=" + bmid + " and Convert(varchar,updatetime,120) like '" + date + @" 00:%' group by id) t  
                on a.id=t.id and a.updatetime=t.updatetime ) b on a.id=b.id
                left join (
                select a.id,a.name,a.val as [t2] from canshuhis a  inner join 
                (select id,min(updatetime) as updatetime from canshuhis 
                where bmid=" + bmid + " and Convert(varchar,updatetime,120) like '" + date + @" 04:%' group by id) t 
                on a.id=t.id and a.updatetime=t.updatetime ) c on a.id=c.id
                left join (
                select a.id,a.name,a.val as [t3] from canshuhis a  inner join 
                (select id,min(updatetime) as updatetime from canshuhis 
                where bmid=" + bmid + " and Convert(varchar,updatetime,120) like '" + date + @" 08:%' group by id) t 
                on a.id=t.id and a.updatetime=t.updatetime ) d on a.id=d.id
                left join (
                select a.id,a.name,a.val as [t4] from canshuhis a  inner join 
                (select id,min(updatetime) as updatetime from canshuhis 
                where bmid=" + bmid + " and Convert(varchar,updatetime,120) like '" + date + @" 12:%' group by id) t 
                on a.id=t.id and a.updatetime=t.updatetime ) e on a.id=e.id
                left join (
                select a.id,a.name,a.val as [t5] from canshuhis a  inner join 
                (select id,min(updatetime) as updatetime from canshuhis 
                where bmid=" + bmid + " and Convert(varchar,updatetime,120) like '" + date + @" 16:%' group by id) t 
                on a.id=t.id and a.updatetime=t.updatetime ) f on a.id=f.id
                left join (
                select a.id,a.name,a.val as [t6] from canshuhis a  inner join 
                (select id,min(updatetime) as updatetime from canshuhis 
                where bmid=" + bmid + " and Convert(varchar,updatetime,120) like '" + date + @" 20:%' group by id) t 
                on a.id=t.id and a.updatetime=t.updatetime ) g on a.id=g.id
                where a.bmid=" + bmid;

                DataTable dt = SqlHelper.GetDataSet(sql).Tables[0];
                if (dt.Rows.Count > 0) return DataTable2Json(dt); else return "";
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }

        //高低日报表（数据）
        public string RPTGDRBB()
        {
            try
            {
                string bmid = HttpContext.Current.Request["bmid"];
                string date = HttpContext.Current.Request["date"];

                string sql = @"select a.id,a.name as icename,Convert(decimal(18,2),t1) as t1,Convert(decimal(18,2),t6) as t6 from v_canshu a 
                left join (
                select id,name,max(val) as [t1] from canshuhis where bmid=" + bmid + "  and year(updatetime)='" + date.Substring(0, 4) + @"' and month(updatetime)='" + date.Substring(5, 2) + @"' and day(updatetime)='" + date.Substring(8, 2) + @"' group by id,name)
                b on a.id=b.id
                left join (
                select id,name,min(val) as [t6] from canshuhis where bmid=" + bmid + "  and year(updatetime)='" + date.Substring(0, 4) + @"' and month(updatetime)='" + date.Substring(5, 2) + @"' and day(updatetime)='" + date.Substring(8, 2) + @"' group by id,name)
                g on a.id=g.id
                where a.bmid=" + bmid;

                DataTable dt = SqlHelper.GetDataSet(sql).Tables[0];
                if (dt.Rows.Count > 0) return DataTable2Json(dt); else return "";
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }

        //标准月报表（生成）
        public string RPTBZYBB()
        {
            try
            {
                string path = HttpContext.Current.Request["path"];
                string date = HttpContext.Current.Request["date"];
                string id = HttpContext.Current.Request["csid"];
                string name = HttpContext.Current.Request["csname"];
                string time = HttpContext.Current.Request["time"];

                Document doc = new Document(path + "标准月报表.doc");

                DocumentBuilder mBuilder = new DocumentBuilder(doc);

                //统计条件
                SetDocBookmarksValue(doc, "TJTJ", "参数：" + name + "    日期：" + date + "    ");
                //制表时间
                SetDocBookmarksValue(doc, "ZBSJ", time);

                for (int i = 1; i <= 31; i++)
                {
                    string d = date + "-" + i.ToString().PadLeft(2, '0');

                    string sql1 = "select top 1 * from canshuhis where id=" + id +
                    " and year(updatetime)='" + date.Substring(0, 4) + "' and month(updatetime)='" + date.Substring(5, 2) + "' and day(updatetime)='" + i.ToString() + "'" +
                    " and datepart(hour,updatetime)='00'";

                    string sql2 = "select top 1 * from canshuhis where id=" + id +
                    " and year(updatetime)='" + date.Substring(0, 4) + "' and month(updatetime)='" + date.Substring(5, 2) + "' and day(updatetime)='" + i.ToString() + "'" +
                    " and datepart(hour,updatetime)='04'";

                    string sql3 = "select top 1 * from canshuhis where id=" + id +
                    " and year(updatetime)='" + date.Substring(0, 4) + "' and month(updatetime)='" + date.Substring(5, 2) + "' and day(updatetime)='" + i.ToString() + "'" +
                    " and datepart(hour,updatetime)='08'";

                    string sql4 = "select top 1 * from canshuhis where id=" + id +
                    " and year(updatetime)='" + date.Substring(0, 4) + "' and month(updatetime)='" + date.Substring(5, 2) + "' and day(updatetime)='" + i.ToString() + "'" +
                    " and datepart(hour,updatetime)='12'";

                    string sql5 = "select top 1 * from canshuhis where id=" + id +
                    " and year(updatetime)='" + date.Substring(0, 4) + "' and month(updatetime)='" + date.Substring(5, 2) + "' and day(updatetime)='" + i.ToString() + "'" +
                    " and datepart(hour,updatetime)='16'";

                    string sql6 = "select top 1 * from canshuhis where id=" + id +
                    " and year(updatetime)='" + date.Substring(0, 4) + "' and month(updatetime)='" + date.Substring(5, 2) + "' and day(updatetime)='" + i.ToString() + "'" +
                    " and datepart(hour,updatetime)='20'";

                    DataTable dt1 = SqlHelper.GetDataSet(sql1).Tables[0];
                    DataTable dt2 = SqlHelper.GetDataSet(sql2).Tables[0];
                    DataTable dt3 = SqlHelper.GetDataSet(sql3).Tables[0];
                    DataTable dt4 = SqlHelper.GetDataSet(sql4).Tables[0];
                    DataTable dt5 = SqlHelper.GetDataSet(sql5).Tables[0];
                    DataTable dt6 = SqlHelper.GetDataSet(sql6).Tables[0];

                    if (dt1.Rows.Count == 1)
                    {
                        SetDocBookmarksValue(doc, "d" + i.ToString() + "1", decimal.Round(decimal.Parse(dt1.Rows[0]["val"].ToString()), 2));
                    }
                    if (dt2.Rows.Count == 1)
                    {
                        SetDocBookmarksValue(doc, "d" + i.ToString() + "2", decimal.Round(decimal.Parse(dt2.Rows[0]["val"].ToString()), 2));
                    }
                    if (dt3.Rows.Count == 1)
                    {
                        SetDocBookmarksValue(doc, "d" + i.ToString() + "3", decimal.Round(decimal.Parse(dt3.Rows[0]["val"].ToString()), 2));
                    }
                    if (dt4.Rows.Count == 1)
                    {
                        SetDocBookmarksValue(doc, "d" + i.ToString() + "4", decimal.Round(decimal.Parse(dt4.Rows[0]["val"].ToString()), 2));
                    }
                    if (dt5.Rows.Count == 1)
                    {
                        SetDocBookmarksValue(doc, "d" + i.ToString() + "5", decimal.Round(decimal.Parse(dt5.Rows[0]["val"].ToString()), 2));
                    }
                    if (dt6.Rows.Count == 1)
                    {
                        SetDocBookmarksValue(doc, "d" + i.ToString() + "6", decimal.Round(decimal.Parse(dt6.Rows[0]["val"].ToString()), 2));
                    }
                }

                if (!Directory.Exists(path + "~/temp/"))
                {
                    Directory.CreateDirectory(path + "~/temp/");
                }

                string Da = DateTime.Now.ToString("yyyyMMddhhmmss");
                string Url = path + "~/temp/" + Da + ".html";
                doc.Save(Url, SaveFormat.Html);

                foreach (string s in Directory.GetFiles(path + "~/temp/"))
                {
                    if (!s.Equals(Url))
                    {
                        File.Delete(s);
                    }
                }

                return path + "temp/" + Da + ".html";
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }

        //高低月报表（生成）
        public string RPTGDYBB()
        {
            try
            {
                string path = HttpContext.Current.Request["path"];
                string date = HttpContext.Current.Request["date"];
                string id = HttpContext.Current.Request["csid"];
                string name = HttpContext.Current.Request["csname"];
                string time = HttpContext.Current.Request["time"];

                Document doc = new Document(path + "高低月报表.doc");

                DocumentBuilder mBuilder = new DocumentBuilder(doc);

                //统计条件
                SetDocBookmarksValue(doc, "TJTJ", "参数：" + name + "    日期：" + date);
                //制表时间
                SetDocBookmarksValue(doc, "ZBSJ", time);

                for (int i = 1; i <= 31; i++)
                {
                    string d = date + "-" + i.ToString().PadLeft(2, '0');

                    string sql1 = "select top 1 * from canshuhis where id=" + id +
                    " and year(updatetime)='" + date.Substring(0, 4) + "' and month(updatetime)='" + date.Substring(5, 2) + "' and day(updatetime)='" + i.ToString() + "'" +
                    " order by val desc";

                    string sql2 = "select top 1 * from canshuhis where id=" + id +
                    " and year(updatetime)='" + date.Substring(0, 4) + "' and month(updatetime)='" + date.Substring(5, 2) + "' and day(updatetime)='" + i.ToString() + "'" +
                    " order by val";

                    DataTable dt1 = SqlHelper.GetDataSet(sql1).Tables[0];
                    DataTable dt2 = SqlHelper.GetDataSet(sql2).Tables[0];

                    if (dt1.Rows.Count == 1)
                    {
                        SetDocBookmarksValue(doc, "d" + i.ToString() + "1", decimal.Round(decimal.Parse(dt1.Rows[0]["val"].ToString()), 2));
                    }
                    if (dt2.Rows.Count == 1)
                    {
                        SetDocBookmarksValue(doc, "d" + i.ToString() + "2", decimal.Round(decimal.Parse(dt2.Rows[0]["val"].ToString()), 2));
                    }
                }

                if (!Directory.Exists(path+"~/temp/"))
                {
                    Directory.CreateDirectory(path+"~/temp/");
                }

                string Da = DateTime.Now.ToString("yyyyMMddhhmmss");
                string Url = path + "~/temp/" + Da + ".html";
                doc.Save(Url, SaveFormat.Html);

                foreach (string s in Directory.GetFiles(path + "~/temp/"))
                {
                    if (!s.Equals(Url))
                    {
                        File.Delete(s);
                    }
                }

                return path + "temp/" + Da + ".html";
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }

        //其他
        [HttpPost]
        public string SendMail()
        {
            string add = HttpContext.Current.Request["add"];
            string subject = HttpContext.Current.Request["subject"];
            string body = HttpContext.Current.Request["body"];

            string strHost = "smtp.163.com";   //SMTP服务器地址
            string strAccount = "zeiotAdmin";       //SMTP服务帐号
            string strPwd = "tszzkj123";       //SMTP服务密码
            string strFrom = "zeiotAdmin@163.com";  //发送方邮件地址
            
            SmtpClient _smtpClient = new SmtpClient();
            _smtpClient.EnableSsl = true;
            _smtpClient.DeliveryMethod = SmtpDeliveryMethod.Network;//指定电子邮件发送方式
            _smtpClient.Host = strHost; ;//指定SMTP服务器
            _smtpClient.Credentials = new System.Net.NetworkCredential(strAccount, strPwd);//用户名和密码

            MailMessage _mailMessage = new MailMessage(strFrom, add);
            _mailMessage.Subject = subject;//主题
            _mailMessage.Body = body;//内容
            _mailMessage.BodyEncoding = System.Text.Encoding.UTF8;//正文编码
            _mailMessage.IsBodyHtml = true;//设置为HTML格式
            _mailMessage.Priority = MailPriority.High;//优先级

            try
            {
                _smtpClient.Send(_mailMessage);
                return "发送成功";
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }
        string DataTable2Json(DataTable dt)
        {
            StringBuilder jsonBuilder = new StringBuilder();
            jsonBuilder.Append("{\"");
            jsonBuilder.Append(dt.TableName);
            jsonBuilder.Append("\":");
            jsonBuilder.Append("[");
            for (int i = 0; i < dt.Rows.Count; i++)
            {
                jsonBuilder.Append("{");
                for (int j = 0; j < dt.Columns.Count; j++)
                {
                    jsonBuilder.Append("\"");
                    jsonBuilder.Append(dt.Columns[j].ColumnName);
                    jsonBuilder.Append("\":\"");
                    jsonBuilder.Append(dt.Rows[i][j].ToString());
                    jsonBuilder.Append("\",");
                }
                jsonBuilder.Remove(jsonBuilder.Length - 1, 1);
                jsonBuilder.Append("},");
            }
            jsonBuilder.Remove(jsonBuilder.Length - 1, 1);
            jsonBuilder.Append("]");
            jsonBuilder.Append("}");
            return jsonBuilder.ToString();
        }
        IPAddress GetIPAddress(string ip)
        {
            byte[] bip = new byte[4];
            string[] sip = ip.Split('.');
            for (int i = 0; i < 4; i++)
            {
                bip[i] = byte.Parse(sip[i]);
            }
            return new IPAddress(bip);
        }
        string Convert10t16(int G10)
        {
            return Convert.ToString(G10, 16);
        }
        byte XOR(byte[] SRC, int Length)
        {
            byte a = SRC[0];
            for (int i = 1; i < Length; i++)
            {
                a = byte.Parse(Convert.ToString(a ^ SRC[i]));
            }
            return a;

        }
        void SetDocBookmarksValue(Document doc, string Mark, object Value)
        {
            if (doc.Range.Bookmarks[Mark] != null)
            {
                Bookmark mark = doc.Range.Bookmarks[Mark];
                mark.Text = Value + "";
            }
        }
        string MD5(string toCryString)
        {
            return FormsAuthentication.HashPasswordForStoringInConfigFile(toCryString, "MD5").ToLower();
        } 
    }
}
