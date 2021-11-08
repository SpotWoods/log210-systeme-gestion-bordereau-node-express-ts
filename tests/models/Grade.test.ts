import chai from 'chai';
import chaiHttp from 'chai-http';
import md5 from 'md5';
import { SemesterJSON } from '../../src/model';
import { Grade } from '../../src/model/Grade';

chai.use(chaiHttp);
const expect = chai.expect;

describe('SemesterTest', () => {

  it('get all grade for a group', () => {
    let grade: Grade = Grade.getInstance();
    grade.clear();
    let gradeDup: Grade = Grade.getInstance();
    expect(grade).to.equal(gradeDup);
  
    grade.insert({"student_id":"first_name.last_name+1@gmail.com","group_id": "S20213-LOG210-01","type":"devoir1","type_id":1,"note":75.1})
    grade.insert({"student_id":"first_name.last_name+1@gmail.com","group_id": "S20213-LOG210-01","type":"devoir2","type_id":1,"note":75.2})
    grade.insert({"student_id":"first_name.last_name+1@gmail.com","group_id": "S20213-LOG210-02","type":"devoir2","type_id":1,"note":75.3})
    grade.insert({"student_id":"first_name.last_name+2@gmail.com","group_id": "S20213-LOG210-03","type":"devoir2","type_id":1,"note":75.4})
    
    let grades = grade.group("S20213-LOG210-01");
    expect(grades).to.deep.equal([
      {
        group_id: 'S20213-LOG210-01',
        type: 'devoir1',
        type_id: 1,
        note: 75.1,
        student_id: 'first_name.last_name+1@gmail.com'
      },
      {
        group_id: 'S20213-LOG210-01',
        type: 'devoir2',
        type_id: 1,
        note: 75.2,
        student_id: 'first_name.last_name+1@gmail.com'
      }
    ])

    let grades2 = grade.student("first_name.last_name+1@gmail.com");
    expect(grades2).to.deep.equal(  [{"group_id": "S20213-LOG210-01", "note": 75.1, "student_id": "first_name.last_name+1@gmail.com", "type": "devoir1", "type_id": 1}, {"group_id": "S20213-LOG210-01", "note": 75.2, "student_id": "first_name.last_name+1@gmail.com", "type": "devoir2", "type_id": 1}, {"group_id": "S20213-LOG210-02", "note": 75.3, "student_id": "first_name.last_name+1@gmail.com", "type": "devoir2", "type_id": 1}]);
    
    grade.clear();
    let grades3 = grade.student("first_name.last_name+1@gmail.com");
    expect(grades3).to.be.undefined;

    let grades4 = grade.group("S20213-LOG210-01");
    expect(grades4).to.deep.equal([]);

  })
  
});
