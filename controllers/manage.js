const { isLoggedInStaff } = require('../authentication');
const { sequelize } = require('../models');

// 관리자 메인 페이지
exports.renderManageMain = async (req, res) => {  
  if(isLoggedInStaff(req, res)) {    
    // 등록된 모집 리스트 출력
    sql = 'SELECT d.id as id, d.title as title, IF(d.enable = 1, "진행 중", "마감") as enable, d.admit as admit, count(a.id) as cnt, d.due as due ';
    sql += 'FROM depts d LEFT OUTER JOIN applications a ON (d.id = a.deptId) ';
    sql += 'GROUP BY d.id, d.title, d.enable, d.admit, d.due';
    depts = await sequelize.query(sql, {type: sequelize.QueryTypes.SELECT});
    res.render('manageMain', {auth : await req.user, list : depts});
  } else {
    res.send("<script> alert('잘못된 접근입니다.'); window.location.replace('/'); </script>");
  }
}

// 관리자의 모집 리스트 추가 페이지
exports.renderManagePost = (req, res) => {  
  if(isLoggedInStaff(req, res)) {
    res.render('managePost');
  } else {
    res.send("<script> alert('잘못된 접근입니다.'); window.location.replace('/'); </script>");
  }
}

// 관리자의 모집 리스트 수정 페이지
exports.renderManagePut = async (req, res) => {  
  if(isLoggedInStaff(req, res)) {
    sql = 'SELECT dname, title, enable, admit, due ';
    sql += 'From depts ';
    sql += `WHERE id = ${req.params.id}`;
    data = await sequelize.query(sql, {type: sequelize.QueryTypes.SELECT});        
    res.render('managePut', {dept : data[0]});
  } else {
    res.send("<script> alert('잘못된 접근입니다.'); window.location.replace('/'); </script>");
  }
}

// 모집 리스트 DB에 추가
exports.postDeptList = async (req, res, next) => {
  if(isLoggedInStaff(req, res)) {
    try {
      await sequelize.query(
        `INSERT INTO depts (dname, title, admit, due, enable) 
        VALUES('${req.body.dname}', '${req.body.title}', '${req.body.admit}', '${req.body.due}', '${(req.body.enable == 'on') ? 1 : 0}')`);      

      res.redirect('/manage');
    } catch (error) {
      console.error(error);
      next(error);
    }
  } else {
    res.send("<script> alert('잘못된 접근입니다.'); window.location.replace('/'); </script>");
  }
};

// 모집 리스트 DB에서 삭제
exports.deleteDept = async (req, res, next) => {
  if(isLoggedInStaff(req, res)) {
    try {    
      res.send(await sequelize.query(`DELETE FROM depts WHERE id = ${req.params.id}`));
    } catch (error) {
      console.error(error);
      next(error);
    }
  } else {
    res.send("<script> alert('잘못된 접근입니다.'); window.location.replace('/'); </script>");
  }  
};

// 모집 리스트 DB에서 수정
exports.updateDept = async (req, res, next) => {
  if(isLoggedInStaff(req, res)) {
    
    try {    
      sql = 'UPDATE depts ';
      sql += `SET dname='${req.body.dname}', title='${req.body.title}', admit='${req.body.admit}', due='${req.body.due}', enable='${(req.body.enable) ? 1 : 0}' `;
      sql += `WHERE id = ${req.params.id}`;
      res.send(await sequelize.query(sql));
    } catch (error) {
      console.error(error);
      next(error);
    }
  } else {
    res.send("<script> alert('잘못된 접근입니다.'); window.location.replace('/'); </script>");
  }  
};