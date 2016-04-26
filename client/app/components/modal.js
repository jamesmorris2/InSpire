import React from 'react';
import {getCourseInfo, getProfessorInfo} from '../server';
import {hhMMToString, meridiemToString} from '../util';

export default class Modal extends React.Component {
  render() {
    var modalType = this.props.type;
    var modalId = this.props.id;
    var data = this.props.data;

    var modalContent;
    var modalTitle;

    var style;
    var size = "modal-lg";
    switch (modalType) {
      case "ClassInformation":
        modalContent = <ClassInfo id={modalId} data={data} button={this.props.button} removeClass={this.props.removeClass} addClass={this.props.addClass}
                                  conflict = {this.props.conflict}/>;
        modalTitle = "Class Information";
        break;
      case "UnofficialTranscript":
        modalContent = <UoTranscript data={data} />;
        modalTitle = "Unofficial Transcript";
        size = "modal-sm";
        break;
      case "FinalExamSchedule":
        modalContent = <FinalExamModal data={data} />;
        modalTitle = "Final Exam Schedule";
        break;
      case "TimeSelection":
        modalContent = "Time Selection";
        modalTitle = "Time Selection";
        break;
      case "AvailableCourses":
        modalContent = <AvailableModal data={data} id={modalId}/>;
        modalTitle = "Available Courses";
        style={zIndex: '1049'};
        size = "modal-sm";
        break;
      default:
        break;
    }

    return (
      <div className="modal fade" role="dialog" id={modalId} style={style}>
        <div className={"modal-dialog " + size}>
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
              <h4 className="modal-title">{modalTitle}</h4>
            </div>
            {modalContent}
          </div>
        </div>
      </div>
    )
  }
}

class FinalExamModal extends React.Component {
  render() {
    this.props.data.sort(function(a, b) {
      return a.final[0] > b.final[0];
    });

    var modalContent = (this.props.data.length === 0)
      ? <div style={{fontWeight: 'bold', textAlign: 'center'}}>No finals, lucky you!</div>
      : <table className="table table-striped">
          <thead>
            <tr>
              <th>Date</th>
              <th>Time</th>
              <th>Course</th>
              <th>Location</th>
            </tr>
          </thead>
          <tbody>
            {this.props.data.map((course, i) => {
              var date = new Date(course.final[0]).toLocaleDateString();
              var time = meridiemToString(course.final[0]) + " - " + meridiemToString(course.final[1]);
              var name = course.courseTag + " " + course.courseNumber + " " + course.courseName;
              var location = course.final[2];
              return (
                <tr key={"tr"+i}>
                  <td>{date}</td>
                  <td>{time}</td>
                  <td>{name}</td>
                  <td>{location}</td>
                </tr>
              )
            })}
          </tbody>
        </table>;

    return(
      <div>
        <div className="modal-body">
          <div className="panel-body" style={{color:'#354066'}}>
            {modalContent}
          </div>
        </div>
        <div className="modal-footer">
          <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
        </div>
      </div>
    );
  }
}

class ClassInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = props.data;
    getProfessorInfo(this.state.instructor, (prof) => {
      this.setState({ professor: prof.firstName + " " + prof.lastName});
    });
  }

  getDays() {
    return this.state.days.join(" / ");
  }

  handleAddClass(e) {
    e.preventDefault();
    this.props.addClass(this.state._id);
  }

  handleDropClass(e) {
    e.preventDefault();
    this.props.removeClass(this.state._id);
  }

  render() {
    var button, conflict, isDisabled;
    var data = this.state;
    var prof = this.state.professor;
    var start = hhMMToString(new Date(data.start));
    var end = meridiemToString(new Date(data.end));

    switch(this.props.button) {
      case 'conflict':
        this.props.conflict.props.style.color = 'black';
        this.props.conflict.props.style.marginRight = '10px';
        conflict = this.props.conflict;
        isDisabled = true;
      case 'add':
        var parentModalId = this.props.id.substring(0, this.props.id.length-1);
        button = (isDisabled) ?
          <span style={{display: 'inline-block', marginRight: '5px'}} data-toggle="modal" data-target={"#"+parentModalId}>
            <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={(e) => this.handleAddClass(e)} disabled>
              Add Class
            </button>
          </span> :
          <span style={{display: 'inline-block', marginRight: '5px'}} data-toggle="modal" data-target={"#"+parentModalId}>
            <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={(e) => this.handleAddClass(e)}>
              Add Class
            </button>
          </span>;
        break;
      default:
        button = <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={(e) => this.handleDropClass(e)}>Drop Class</button>;
    }

    // The denominator is the number of columns
    return (
      <div>
        <div className="modal-body">
          <div className="panel-body" style={{color:'#354066'}}>
            <table className="table">
              <thead>
                <tr>
                  <th style={{width: '22%'}}>Number</th>
                  <th style={{width: '22%'}}>Section</th>
                  <th style={{width: '22%'}}>Units</th>
                  <th style={{width: '14%'}}>Enrolled</th>
                  <th style={{width: '30%'}}>Cap</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{width: '22%'}}>{data.courseTag} {data.courseNumber}</td>
                  <td style={{width: '22%'}}>{data.section}</td>
                  <td style={{width: '22%'}}>{data.credits}</td>
                  <td style={{width: '14%'}}>{data.enrolled.length}</td>
                  <td style={{width: '30%'}}>{data.capacity}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="panel-body" style={{color:'#354066'}}>
            <table className="table">
              <thead>
                <tr>
                  <th style={{width: '22%'}}>Title</th>
                  <th style={{width: '22%'}}>Time</th>
                  <th style={{width: '22%'}}>Room</th>
                  <th style={{width: '14%'}}>Instructor</th>
                  <th style={{width: '30%'}}>Restrictions</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{width: '22%'}}>{data.courseName}</td>
                  <td style={{width: '22%'}}>{this.getDays()} <br/> {start} - {end}</td>
                  <td style={{width: '22%'}}>{data.location}</td>
                  <td style={{width: '14%'}}>{prof}</td>
                  <td style={{width: '30%'}}>{data.restrictions}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="panel-body" style={{color:'#354066'}}>{data.description}</div>
        </div>
        <div className="modal-footer">
          {conflict}
          {button}
          <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
        </div>
      </div>
    );
  }
}

class UoTranscript extends React.Component {
  constructor(props) {
    super(props);

    var transcript = [];
    this.props.data.map((tuples) => {
      var courseAndGrade = [];
      getCourseInfo(tuples[0], (klass) => {
        courseAndGrade.push(klass.courseTag + " " + klass.courseNumber + " " + klass.courseName);
        courseAndGrade.push(tuples[1]);
        transcript.push(courseAndGrade);
        this.setState({transcript: transcript});
      });
    });
  }

  render() {
    var modalContent =
      (this.state !== null)
      ? <table className="table table-striped">
          <thead>
            <tr>
              <th>Course</th>
              <th>Grade</th>
            </tr>
          </thead>
          <tbody>
            {this.state.transcript.map((tuples, i) => {
              return (
                <tr key={"tr"+i}>
                  <td>{tuples[0]}</td>
                  <td>{tuples[1]}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      : <div style={{fontWeight: 'bold', textAlign: 'center'}}>You have no grades on record</div> ;

    return(
      <div>
        <div className="modal-body">
          <div className="panel-body" style={{color:'#354066'}}>
            {modalContent}
          </div>
        </div>
        <div className="modal-footer">
          <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
        </div>
      </div>
    );
  }
}

class AvailableModal extends React.Component {
  render() {
    var body;

    body =
      (this.props.data.length > 0)
      ? this.props.data.map((course, i) => {
          return(
            <button key={"btn"+i} type="button" className="course-modal-btn" data-toggle="modal" data-target={"#"+this.props.id+i}>
              {course.courseTag} {course.courseNumber} - {course.courseName}
            </button>
          );
        })
      : body = <div><span style={{fontWeight: 'bold'}}>There are no available courses to take at this time.</span></div>;

    return(
      <div>
        <div className="modal-body" style={{textAlign: "center"}}>
          <div className="panel-body" style={{color:'#354066'}}>
            {body}
          </div>
        </div>
        <div className="modal-footer">
          <button type="button" className="button-default" data-dismiss="modal">Close</button>
        </div>
      </div>
    );
  }
}
