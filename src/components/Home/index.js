import React from 'react';
import { Row, Col ,Card, CardBody, Form, FormGroup, Label, Input, Button,
    Modal, ModalHeader, ModalBody, ModalFooter, UncontrolledTooltip ,Container} from 'reactstrap';
import { connect } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import { renderField, renderDateTimePicker } from "../../helpers/renderFields.js";
import PropTypes from 'prop-types';
import { Field,reduxForm } from "redux-form";
import LoadingSpinner from '../LoadingSpinner';
import { withRouter } from "react-router-dom";
import Select from 'react-select';
import ReactTable from 'react-table';
import {getListData, getDownloadData, getUserProfile, postRetention} from '../../actions/homeActions';
import './style.sass';
import {baseURL} from '../../actions/api.js';
import Header from '../Header';
import { Link } from 'react-router-dom';

class Home extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
            modal: false,
            Id: null,
            environment: '',
            filedateform: '',
            activitytype: '',
            filedateto: '',
            filedirection: '',
            requesttype: ''
        };
    this.setFile = this.setFile.bind(this);
    this.toggle = this.toggle.bind(this);
    this.submitRetention = this.submitRetention.bind(this);
    this.downloadData = this.downloadData.bind(this);
  }

  setFile(Id){
        this.setState({modal: !this.state.modal,
            Id: Id});
  }

  componentDidMount(){
    this.props.getUserProfile();
    let queryParams = {};
    queryParams.Environment = this.state.environment;
    queryParams.FileDateTo = this.state.filedateform;
    queryParams.FileDirection = this.state.filedirection;
    queryParams.RequestType = this.state.requesttype;
    queryParams.FileDateFrom = this.state.filedateto;
    queryParams.ActivityType = this.state.activitytype;
    let queryData = Object.keys(queryParams).map(key => key + '=' + queryParams[key]).join('&');   
    this.props.getListData(queryData);
  }

  toggle(){
    this.setState({modal: !this.state.modal});
  }

  submitRetention(userData){
    const { Id } = this.state;
    const { RetentionTime } = userData
      let payload = {
        RetentionTime:moment(RetentionTime).format('YYYYMMDDHHmmss'),
        Id: Id
      }
    this.props.postRetention(payload).           
            then(() => this.handleSetSuccess()).
            catch(() => this.handleSetError());
  }

  handleSetSuccess(){
    toast.success('Set File Retention Successfully');
    this.setState({modal: false});
  }

  handleSetError(){
      const {isError} = this.props.home;
      if(isError){
          toast.error('Something went wrong');
          this.setState({modal: false});
      }
      else{
         toast.error('Something went wrong');
         this.setState({modal: false});
      }
  }

  downloadData(Id, FileType){
    let formData ={
      Id,
      FileType
    }
    let formDat = Object.keys(formData).map(key => key + '=' + formData[key]).join('&');
    this.props.getDownloadData(formDat)
  }


  onFilterSubmit = () => {
    let queryParams = {};
      queryParams.Environment = this.state.environment.value ? this.state.environment.value : '' ;
      queryParams.FileDateFrom = this.state.filedateform ? moment(this.state.filedateform).format('YYYYMMDDHHmmss'): '';
      queryParams.FileDirection = this.state.filedirection.value ? this.state.filedirection.value : '';
      queryParams.RequestType = this.state.requesttype.value ? this.state.requesttype.value : '' ;
      queryParams.FileDateTo = this.state.filedateto ? moment(this.state.filedateto).format('YYYYMMDDHHmmss'): '';
      queryParams.ActivityType = this.state.activitytype.value ? this.state.activitytype.value : '';
      let queryData = Object.keys(queryParams).map(key => key + '=' + queryParams[key]).join('&');   
      this.props.getListData(queryData);
  }

  onResetSubmit = () => {
      let queryParams = {};
      queryParams.Environment = '';
      queryParams.FileDateFrom = '';
      queryParams.FileDirection = '';
      queryParams.RequestType = '';
      queryParams.FileDateTo = '';
      queryParams.ActivityType = '';
      let queryData = Object.keys(queryParams).map(key => key + '=' + queryParams[key]).join('&');   
      this.props.getListData(queryData);
      this.setState({
        environment: '',
        filedateform:'',
        filedirection: '',
        requesttype: '',
        filedateto: '',
        activitytype: ''
    })
  } 

  onFilterChange = (event) => {
    this.setState({
      [event.target.name] : event.target.value
    })
  }



  render() { 
  const {home, handleSubmit} = this.props;
  const {isLoading} = home;
  const userprofile = this.props && this.props.home && this.props.home.userprofileData && this.props.home.userprofileData.data; 
  const environment_value_array = userprofile && userprofile.environment_list;
  const activity_type_array = userprofile && userprofile.activity_type;
  const file_direction_array = userprofile && userprofile.file_direction;
  const request_type_array = userprofile && userprofile.request_type;
  let environment_value = [];
  if(environment_value_array){
    environment_value_array.map((item) => {
      environment_value.push({value:item, label:item});
    })
  }
  let datalist = [];
  let activity_type = [];
  if(activity_type_array){
    activity_type_array.map((item) => {
      activity_type.push({value:item, label:item});
    })
  }
  let file_direction = [];
  if(file_direction_array){
    file_direction_array.map((item) => {
      file_direction.push({value:item, label:item});
    })
  }
  let request_type = [];
  if(request_type_array){
    request_type_array.map((item) => {
      request_type.push({value:item, label:item});
    })
  }
  const listDat = this.props.home && this.props.home.listData && this.props.home.listData.data; 
  const columns = [{
      Header: 'File date',
      className: 'text-center',
      width:140,
      Cell: props => <span>{moment.tz(props.original.FileDate, 'YYYYMMDDHHmmss', 'Central Standard Time').local().format('DD/MM/YYYY HH:mm')}</span>
    }, 
    {
      Header: 'Envirnoment',
      accessor: 'Environment',
      className: 'text-center',
      maxWidth:120,
    }, 
    {
      Header: 'Activity Type',
      accessor: 'ActivityType',
      className: 'text-center',
      maxWidth:110,
    }, 
    {
      Header: 'File Direction',
      accessor: 'FileDirection',
      className: 'text-center',
      maxWidth:110,
    }, 
    {
      Header: 'Request Type',
      accessor: 'RequestType',
      className: 'text-center',
      maxWidth:140,
    }, 
    {
      Header: 'Form Server',
      accessor: 'FromServer',
      className: 'text-center',
      maxWidth:140,
    }, 
    {
      Header: 'Action',
      className: 'text-center',
      filterable: false,
      maxWidth:220,
      Cell: (props) => {  
        let reslink = `${baseURL}/download?Id=${props.original.Id}&FileType=ResponseFile`
        let reqlink = `${baseURL}/download?Id=${props.original.Id}&FileType=RequestFile`
        let filelink = `${baseURL}/download?Id=${props.original.Id}&FileType=File`
        return  (<div> 
         {props.original.ActivityType == 'Ws' ? 
         <div>
         {props.original.ResponseFile &&
          <div> <a href={reslink} target="blank">
          <i className="fa fa-download"></i> Download  Response </a> 
          </div>
         }          
        {props.original.RequestFile && 
         <div> <a href={reqlink} target="blank"> 
         <i className="fa fa-download"></i> Download Request</a> 
         </div>
         } 
         </div> :
         <div>
        {props.original.File &&
        <div> <a  href={filelink} target="blank" onClick={this.downloadData}> 
        <i className="fa fa-download"></i> Download File </a> 
        </div> }
        </div>
         }
        </div>)
      }
    }, 
    {
      Header: 'Set File Retention',
      filterable: false,
      width:140,
      className: 'text-center',
      Cell: props => <div>
      <button className="btn btn-warning" id={"Tooltip"+props.original.Id} 
      onClick={() => this.setFile(props.original.Id)}> <i className="fa fa-edit"></i></button>
      <UncontrolledTooltip placement="top" target={"Tooltip"+props.original.Id}>
        Set File Retention
      </UncontrolledTooltip>
      </div>
    }]
    return (
      <React.Fragment>
      {isLoading && <LoadingSpinner />}
      <Header />
      <Container className="customTablePage">
        <Row className="mb-2">
          <Col md={6} sm={6} xs={6} className="fontBold">Filter Activity</Col>
         {userprofile && userprofile.is_admin == 'True'? 
          <Col md={6} sm={6} xs={6} className="text-right fontBold"> Customer Code</Col>
          : ''}
        </Row>
        <Row className="mb-2">
          <Col md={5} xs={12}>
            <Row>
              <Col md={4} xs={12}>Environment</Col>
              <Col md={8} xs={12}>
                <Select 
                 id="environment"
                 value={this.state.environment}
                 name="environment"
                 onChange={(val)=> {this.onFilterChange({target: {name:'environment', value:val}})}}
                 options={environment_value}
                />
              </Col>
            </Row>
          </Col>
          <Col md={5} xs={12}>
            <Row>
              <Col md={4} xs={12}>File Date Form</Col>
              <Col md={8} xs={12}>
               <Input type="date" name="filedateform" id="filedateform" value={this.state.filedateform} placeholder="File Date Form" onChange={this.onFilterChange}/>
              </Col>
            </Row>
          </Col>
          <Col md={2} xs={12}>
            <Row>
              <Col md={12} xs={12} className="text-right">
              {userprofile && userprofile.is_admin == 'True'?
                <Label className="textcolor p-1"> {userprofile.company_code}</Label>  
                : ''}
              </Col>
            </Row> 
          </Col>
        </Row>
      {/* Row 2 */}
        <Row className="mb-2">
          <Col md={5}>
            <Row>
              <Col md={4}>Activity Type</Col>
              <Col md={8}>
                <Select 
                 id="activitytype"
                 value={this.state.activitytype}
                 name="activitytype"
                 onChange={(val)=> {this.onFilterChange({target: { name:'activitytype', value:val }})}}
                 options={activity_type}
                />
              </Col>
            </Row>
          </Col>
          <Col md={5}>
            <Row>
              <Col md={4}>File Date To</Col>
              <Col md={8}>
               <Input  type="date" name="filedateto" id="filedateto" value={this.state.filedateto} onChange={this.onFilterChange}/>
              </Col>
            </Row>
          </Col>
          <Col md={2}>
            <Row>
              <Col md={12} className="text-right">
                <Button onClick={this.onResetSubmit} size="md" className="textcolor btnFilter">Reset</Button>  
              </Col>
            </Row> 
          </Col>
        </Row>
      {/* Row 3 */}
        <Row className="mb-2">
          <Col md={5}>
            <Row>
              <Col md={4}>File Direction</Col>
              <Col md={8}>
              <Select 
                 id="filedirection"
                 value={this.state.filedirection}
                 name="filedirection"
                 onChange={(val)=> {this.onFilterChange({target: { name:'filedirection', value: val }})}}
                 options={file_direction}
                />
              </Col>
            </Row>
          </Col>
          <Col md={5}>
            <Row>
              <Col md={4}>Request Type</Col>
              <Col md={8}>
                <Select 
                 id="requesttype"
                 value={this.state.requesttype}
                 name="requesttype"
                 onChange={(val)=> {this.onFilterChange({target: { name:'requesttype', value: val }})}}
                 options={request_type}
                />
              </Col>
            </Row>
          </Col>
          <Col md={2} className="text-right">
            <Row>
              <Col md={12}>
                 <Button onClick={this.onFilterSubmit} size="md" className="textcolor btnFilter">Filter</Button>  
              </Col>
            </Row> 
          </Col>
        </Row>       
       {/* Row 4 Msg Card */}
        <Row className="mb-2 mt-4">
          <Col md={12}>
            {userprofile && userprofile.is_admin == 'True'? 
              <Card className="cardfix textcolor fontBold"> Message: The Screen is for Admin Users</Card>
             : ''}
          </Col>
        </Row>  
        {/* Row 4 React Table */}
        <Row className="mb-2">
          <Col md={12}>
           <ReactTable
            pageSizeOptions={[5, 10, 20, 25, 50, 100]}
            defaultPageSize={5}
            data={listDat}
            columns={columns}
            loading={false}
            />
          </Col>
        </Row>  
        <ToastContainer />
         <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <Form onSubmit={handleSubmit(this.submitRetention)}>
            <ModalHeader>Set File Retention</ModalHeader>
            <ModalBody>
              <FormGroup>
                  <Row>
                      <Col md="3" className="align-self-center">
                          <Label className="mb-0" htmlFor="retention">RetentionTime</Label>
                      </Col>
                      <Col md="9">
                          <Field type="time"
                              name="RetentionTime" 
                              id="RetentionTime" 
                              component={renderDateTimePicker}
                          />    
                      </Col> 
                  </Row>
              </FormGroup>
            </ModalBody>
            <ModalFooter>
            <FormGroup className="form-actions">
                <Button type="submit" size="sm" color="primary" className="mr-1"> Submit</Button>
                <Button onClick={this.toggle} size="sm" color="danger"> Close</Button>
            </FormGroup>
            </ModalFooter>
            </Form>
          </Modal>
      </Container>
    </React.Fragment>
    );
  }
}

Home.propTypes = {
  home: PropTypes.object,
}

let HomeWithRouter = withRouter(Home);

let HomeForm =  connect(state => 
    ({
         home: {...state.home} || {},
    }),
dispatch => 
    ({
      getListData: (queryData) => dispatch(getListData(queryData)),
      getDownloadData: (formData) => dispatch(getDownloadData(formData)),
      getUserProfile: () => dispatch(getUserProfile()),
      postRetention: (userData) => dispatch(postRetention(userData))
    }))(HomeWithRouter);

export default reduxForm({
    form: "homeForm"
})(HomeForm);