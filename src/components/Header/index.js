import React from 'react';
import {Row, Col} from 'reactstrap';
import { connect } from 'react-redux';
import './style.sass';
import {getUserProfile} from '../../actions/homeActions';

class Header extends React.Component{
    constructor(props){
        super(props);
        this.state={

        };
    }

    componentDidMount = () => {
        getUserProfile()
    }

    render(){
        let account_manager = '-';
        let support_email = '-';
        let support_phone = '-';
        const userData = this.props.home && this.props.home.userprofileData && this.props.home.userprofileData.data;
        if(userData){
            account_manager = userData.account_manager;
            support_email = userData.support_email;
            support_phone = userData.support_phone;
        }
        return (
            <header className="header">
                <div className='container-fluid'>
                    <Row>
                        <Col className='text-left'>
                            <img src={`https://s3.us-east-2.amazonaws.com/support-app/logo.png`} className='img-responsive logo-image'/>
                        </Col>
                        <Col className='text-left account-ul'>
                            <ul>
                                <li><span className='text-left'><label>Account Manager <span>:</span> </label> </span> {account_manager ? account_manager.toUpperCase() : ''}</li>
                                <li><span className='text-left'><label>Support contact <span>:</span> </label> </span> {support_phone ? support_phone : ''}</li>
                                <li><span className='text-left'><label>Support e-mail <span>:</span> </label> </span> {support_email ? support_email : ''}</li>
                            </ul>
                        </Col>
                    </Row>
                </div>
            </header>
        )
    }
} 

function mapStateToProps(state) {
    return {
      home: { ...state.home } || {},
    };
  }
  
function mapDispatchToProps(dispatch) {
    return ({
        getUserProfile: () => dispatch(getUserProfile()),
    });
  }
  
export default connect(mapStateToProps, mapDispatchToProps)(Header);