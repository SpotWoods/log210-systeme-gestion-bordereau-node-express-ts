import chai from 'chai';
import { GradeController } from '../../src/controller/GradeController';
import chaiHttp from 'chai-http';

chai.use(chaiHttp);
const expect = chai.expect;

describe('CourseControllerTest', () => {
  
  it('CourseControllerTest insert grade', () => {
    let controller: GradeController = new GradeController();
    controller.insert({"student_id":"first_name.last_name+1@gmail.com", "group_id":"S20213-LOG210-01","type":"devoir1","type_id":1,"note":75.1})
    controller.insert({"student_id":"first_name.last_name+1@gmail.com", "group_id":"S20213-LOG210-01","type":"devoir2","type_id":1,"note":75.2})
    controller.insert({"student_id":"first_name.last_name+1@gmail.com", "group_id":"S20213-LOG210-02","type":"devoir2","type_id":1,"note":75.3})
    controller.insert({"student_id":"first_name.last_name+2@gmail.com", "group_id":"S20213-LOG210-03","type":"devoir2","type_id":1,"note":75.4})
  
    let grades = controller.group("S20213-LOG210-01");
    expect(grades.length).to.equal(2);
    expect(grades[0]).to.deep.equal(   {"group_id": "S20213-LOG210-01", "note": 75.1, "student_id": "first_name.last_name+1@gmail.com", "type": "devoir1", "type_id": 1})
  
    grades = controller.student("first_name.last_name+1@gmail.com")
    expect(grades.length).to.equal(3)
    expect(grades[2]).to.deep.equal( {"group_id": "S20213-LOG210-02", "note": 75.3, "student_id": "first_name.last_name+1@gmail.com", "type": "devoir2", "type_id": 1})

    controller.clear()
  })
    
});
