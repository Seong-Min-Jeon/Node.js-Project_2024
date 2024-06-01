const { isLoggedIn, isLoggedInStaff } = require('../authentication');
const { sequelize } = require('../models');

// 사용자 메인 페이지
exports.renderApplyMain = async (req, res) => {  
  if(isLoggedInStaff(req, res)) {
    res.send("<script> alert('잘못된 접근입니다.'); window.location.replace('/'); </script>");
  } else if(isLoggedIn(req)) {
    // 등록된 모집 리스트 출력    
    depts = await sequelize.query('SELECT id, title, IF(enable = 1, "진행 중", "마감") as enable, admit, due FROM depts', {type: sequelize.QueryTypes.SELECT});

    // 사용자가 작성한 지원서가 있다면 depts.id와 applications.id를 출력
    sql = 'SELECT d.id as deptId, a.id as appId ';
    sql += 'FROM depts d JOIN applications a ON (d.id = a.deptId) ';
    sql += `WHERE a.uid = ${res.locals.user.id}`;
    application = await sequelize.query(sql, {type: sequelize.QueryTypes.SELECT});    

    console.log(application[0]);

    res.render('applyMain', {auth : await req.user, list : depts, app : application[0]});
  } else {
    res.send("<script> alert('잘못된 접근입니다.'); window.location.replace('/'); </script>");
  }
}

// 사용자 입사 지원 페이지
exports.renderApplyPost = (req, res) => {  
  if(isLoggedIn(req)) {
    res.render('applyPost', {deptId : req.params.deptId});
  } else {
    res.send("<script> alert('잘못된 접근입니다.'); window.location.replace('/'); </script>");
  }
}

// 지원서 DB에 추가
exports.postApplication = async (req, res, next) => {
  if(isLoggedIn(req, res)) {
    try {
      sql = 'INSERT INTO applications (uid, deptId, name, engName, phoneNumber, phoneNumber2, address, email, ';
      sql += 'licenseName1, licenseGet1, licenseAgency1, licenseName2, licenseGet2, licenseAgency2, ';
      sql += 'licenseName3, licenseGet3, licenseAgency3, licenseName4, licenseGet4, licenseAgency4, ';
      sql += 'companyName1, companyPeriod1, companyJob1, companyName2, companyPeriod2, companyJob2, ';
      sql += 'companyName3, companyPeriod3, companyJob3, companyName4, companyPeriod4, companyJob4, ';
      sql += 'introduction1, introduction2, introduction3, introduction4) ';
      sql += `VALUES('${res.locals.user.id}', '${req.params.deptId}', '${req.body.name}', '${req.body.engName}', `;
      sql += `'${req.body.phoneNumber}', '${req.body.phoneNumber2}', '${req.body.address}', '${req.body.email}', `;
      sql += `'${req.body.licenseName1}', '${req.body.licenseGet1}', '${req.body.licenseAgency1}', `;
      sql += `'${req.body.licenseName2}', '${req.body.licenseGet2}', '${req.body.licenseAgency2}', `;
      sql += `'${req.body.licenseName3}', '${req.body.licenseGet3}', '${req.body.licenseAgency3}', `;
      sql += `'${req.body.licenseName4}', '${req.body.licenseGet4}', '${req.body.licenseAgency4}', `;
      sql += `'${req.body.companyName1}', '${req.body.companyPeriod1}', '${req.body.companyJob1}', `;
      sql += `'${req.body.companyName2}', '${req.body.companyPeriod2}', '${req.body.companyJob2}', `;
      sql += `'${req.body.companyName3}', '${req.body.companyPeriod3}', '${req.body.companyJob3}', `;
      sql += `'${req.body.companyName4}', '${req.body.companyPeriod4}', '${req.body.companyJob4}', `;
      sql += `'${req.body.introduction1}', '${req.body.introduction2}', `;
      sql += `'${req.body.introduction3}', '${req.body.introduction4}')`;      
      
      await sequelize.query(sql);      

      res.send("<script> alert('지원해주셔서 감사합니다.'); window.location.replace('/apply'); </script>");
    } catch (error) {
      console.error(error);
      next(error);
    }
  } else {
    res.send("<script> alert('잘못된 접근입니다.'); window.location.replace('/'); </script>");
  }
};