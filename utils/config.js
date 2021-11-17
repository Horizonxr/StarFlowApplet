const version = '1.0.0';


// const baseUrl = 'http://37446r369t.zicp.vip/';
let baseUrl;


if(process.env.NODE_ENV === 'development'){
    console.log('开发环境')
	baseUrl = 'http://37446r369t.zicp.vip/'
}else{
    console.log('生产环境')
	baseUrl = 'http://37446r369t.zicp.vip/'
}

export {
	version,
	baseUrl
}