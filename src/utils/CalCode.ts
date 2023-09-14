//将整数转换成AB
function convertNumToABC(num:number)
{
  var code = '';
  while(num>0)
  {
    var m = num % 26;
    if(m==0)
    {
      m = 26;
    }
    code = String.fromCharCode( 64 + m )+code;
    num = (num - m) / 26;
  }
  if(code.length == 1)
      code = "A"+code;
  return code;
}

//将AB转换为整数
function convertABC2Num(code:string)
{
  var num = 0;
  for(var i=code.length-1,j=1;i>=0;i--,j*=26)
  {
    num+= (code.charCodeAt(i)-64)*j;
  }
  return num;
}

//将整数在前面补齐三位
function convertNumTo000(num:number)
{
  var code="";
  if(num<10)
  {
    code = "00"+num.toString();
  }
  else if(num < 100)
  {
    code = "0"+num.toString();
  }
  else
  {
    code = num.toString();
  }
  return code;
}

//根据经纬度计算编码 
export function CalCodes(lat:number,lon:number)
{
    lat = lat+90;
    lon = lon +180;
    var codelat1=1;
    var codelon1=1;

    //Math.
    if(lat>0 )
      codelat1 = Math.ceil(lat/0.5);   //向上取整
    if(lon>0)
      codelon1 = Math.ceil(lon/0.5);
    
    //一级网格编码
    var code1 = convertNumTo000(codelon1)+convertNumToABC(codelat1);

    //计算二级网格编号
    var code2=1;
    var lat2 = lat - (codelat1-1) * 0.5;
    var lon2 = lon - (codelon1-1) * 0.5;
    var numlat2 = 1;
    var numlon2 = 1;
    if(lat2>0)
      numlat2 = Math.ceil(lat2/0.25);
    if(lon2>0)
      numlon2 = Math.ceil(lon2/0.25);
    code2 = numlon2  + (2-numlat2) * 2;

    //计算三级网格编号
    var code3=0;
    var lat3 = lat - (codelat1-1) * 0.5 - (numlat2-1) * 0.25;
    var lon3 = lon - (codelon1-1) * 0.5 - (numlon2-1) * 0.25;
    var numlat3 = 1;
    var numlon3 = 1;
    if(lat3>0)
      numlat3 = Math.ceil(lat3/0.08334);
    if(lon3>0)
      numlon3 = Math.ceil(lon3/0.08334);

    code3 = numlon3 + (3-numlat3) * 3;

    return {
      "1":code1,
      "2":code1 + code2.toString(),
      "3":code1 + code2.toString()+code3.toString()
    }
}

//根据编码返回左下角经纬度
export function CalCoords(level:number,code:string)
{
  //计算所在一级格网的左下角坐标
    var numlon1 = parseInt(code.substring(0,3));
    var codeLat1 = code.substring(3,5);
    var numlat1 = convertABC2Num(codeLat1);
    var lon1 = numlon1 * 0.5 - 0.5 - 180;
    var lat1 = numlat1 * 0.5 -0.5 - 90;

    var lon2,lon3,lat2,lat3;

    if(level == 1)
      return{
        "lon1":lon1,
        "lat1":lat1
      }

    //计算所在二级格网的左下角坐标
    //var lat2,lon2;
    if(level > 2 && code.length > 5 )
    {
        var code2 = parseInt(code.charAt(5));
        var numlon2 = code2 - (Math.ceil(code2 / 2) * 2) + 1;
        var numlat2 = 2 - Math.ceil(code2/2);
        lat2 = lat1 + numlat2 * 0.25;
        lon2 = lon1 + numlon2 * 0.25;
        if(level == 2)
          return{
           "lon1":lon1,
           "lat1":lat1,
            "lon2":lon2,
            "lat2":lat2
          }
    }

    //计算所在3级格网的左下角坐标
    //var lat3,lon3;
    if(level == 3 && code.length > 6 )
    {
        var code3 = parseInt(code.charAt(6));
        var numlon = code3 - (Math.ceil(code3 / 3) * 3) + 2;
        var numlat = 3 - Math.ceil(code3/3);
        lat3 =   lat2 as number +  (numlat * 5) / 60;
        lon3 =  lon2 as number +  (numlon * 5) / 60;
        return {
          "lon1":lon1,   //lon1，lon2，lat1，lat2都是计算的最终值，单位度
          "lat1":lat1,
          "lon2":lon2,
          "lat2":lat2,
          "lon3":lon3 ,  //--此处是单位是分，最终值还需要加上lon2，才是三级格网的左下角坐标
          "lat3": lat3
        }
      }
}