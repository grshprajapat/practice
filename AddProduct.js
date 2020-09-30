import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import classNames from 'classnames';
import ReeValidate from 'ree-validate';
import Http from '../../Http';
import AdminHeaderNav from '../../pages/AdminHeaderNav';
import AdminFooter from '../../pages/AdminFooter';
import { Alert } from 'reactstrap';
import CKEditor from "react-ckeditor-component";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Moment from 'moment';

class AddProduct extends Component {
	
	
  constructor(props) {
    super(props);
		this.state = {isToggleOn: true};
	    this.state = {isChecked: false};	
	this.validator = new ReeValidate({
      title: 'required|min:3',
      sub_title: 'required|min:3',
    });
		this.handleChecked = this.handleChecked.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleDate = this.handleDate.bind(this);
		
		 
		
    this.state = {
      // name: '',
	  isLoading: false, 
      title: '',
      sub_title: '',
      product_category: '',
	  description: '',
      vin: '',
      product_image: [],
	  // file: null,
      product_condition: '',
      product_brand: '',
      product_year: '',
      fuel_type: '',
      cd_player: '',
	  startDate: new Date(),
	  
      anti_lock_brakes: '',
      air_conditioning: '',
      power_seat: '',
      power_locks: '',
      cruise_control: '',
      suv: '',
      air_bags: '',
      sunroof: '',
      engine: '',
      transmission: '',
      warrenty: '',
      product_make: '',
      product_model: '',
      product_color: '',
      storage_capacity: '',
      camera_resolution: '',
      sim_card_slot: '',
      ram_memory_card: '',
      interior: '',
      exterior: '',
      video_file_link: '',
      youtube: '',
      sale_by: '',
      selling_duration: '',
      selling_price: '',
      selling_quantity: '',
      // paypal: '',
      // additional_payment: '',
      // payment_instruction: '',
      domestic_return: '',
      international_return: '',
      // shhipping_rate: '',
      // free_shipping: '',
      // item_location: '',
	  parentCategory: [],
	  category: [],
	  subCategory: [],
	  error: false,
	   errorDesc: null,
	  errors: {},
	  visible: false,
	  data:[],
	  
    };
	
	this.api = window.appUrl+'api/v1/addAdminProduct';
    this.addNotification = this.addNotification.bind(this);
	this.categoryfetch = window.appUrl+'api/v1/categorieslist';
	this.subCategoryfetch = window.appUrl+'api/v1/categories';
	
  }
	
	addNotification() {
		// alert(message);
		
		this.setState({ visible: true }, () => {
		  window.setTimeout(() => {
			this.setState({ visible: false });
			this.props.history.push(window.appUrl+'admin/products')
		  }, 2000);
		});
	}
	
	componentDidMount() {
	
		var access_token = localStorage.getItem('access_token');
	  
		 fetch(this.categoryfetch, { 
		  method: 'get', 
		  headers: new Headers({
			'Authorization': 'bearer '+ access_token
		  })
		})
		// fetch(this.categoryfetch)
			.then(response => {
			if (!response.ok) {
			  throw Error(response.statusText);
			}
			return response.json();
		})
		.then(response => { 
        
			this.setState({ parentCategory: response.data });
			this.setState({ pcat: response.data });
				console.log(response.data);
			// alert(response.data);
			
		})
		.catch(() => {
        
		});
		
   
	}
	

	  
	/** image uploading **/
    uploadMultipleFiles = (e) => {
        let files = Array.from(e.target.files);
	  
		files.forEach((file) => {
			// alert(file);
			let reader = new FileReader();
			reader.onloadend = () => {
				this.setState({    
					 // files: [...this.state.files, file],
					 product_image: [...this.state.product_image, reader.result],
					 file: [...this.state.product_image, reader.result]
				});
				
			}
			
		reader.readAsDataURL(file);
		  });
        
    }
	
	resetFile = id => {
		var array = [...this.state.product_image]; // make a separate copy of the array
	    var index = array.indexOf(id);
	 
	    if (index !== -1) {
		  array.splice(index, 1);
		  this.setState({product_image: array});
	    }
    }
	
	//iamge///	
	  
	handleDate(date) {
		this.setState({
			startDate:date
		})
	}
	  
	handleSubmit = (e) => {
			
		e.preventDefault();
		this.setState({ isLoading: true });
		const { title, sub_title } = this.state;
		const credentials = {
		  title,
		  sub_title,
		};
		
		if(this.state.description == '')
		{
			this.setState({ errorDesc: 'Please enter the desciption.' });
			this.setState({ isLoading: false });
			return false;
			// this.setState({ isLoading: false });
			// return false;
		}
		
		
	
		this.validator.validateAll(credentials).then((success) => {
		  if (success) {
		
			 // alert(this.state.warrenty);
			let formData = new FormData();
			// formData.append("name", this.state.name);
			formData.append("title", this.state.title);
			formData.append("sub_title", this.state.sub_title);
			formData.append("product_category", this.state.product_category);
			formData.append("description", this.state.description);
			formData.append("vin", this.state.vin);
			 this.state.product_image.forEach((image_file) => 
			 { 
			
             formData.append('file[]', 	);
				});
			formData.append("product_condition", this.state.product_condition);
			formData.append("product_brand", this.state.product_brand);
			formData.append("product_year",Moment(this.state.startDate).format('YYYY'));
			formData.append("fuel_type", this.state.fuel_type);
			formData.append("cd_player", this.state.cd_player);
			formData.append("anti_lock_brakes", this.state.anti_lock_brakes);
			formData.append("air_conditioning", this.state.air_conditioning);
			formData.append("power_seat", this.state.power_seat);
			formData.append("power_locks", this.state.power_locks);
			formData.append("cruise_control", this.state.cruise_control);
			formData.append("suv", this.state.suv);
			formData.append("air_bags", this.state.air_bags);
			formData.append("sunroof", this.state.sunroof);
			formData.append("engine", this.state.engine);
			formData.append("transmission", this.state.transmission);
			formData.append("warrenty", this.state.warrenty);
			formData.append("product_make", this.state.product_make);
			formData.append("product_model", this.state.product_model);
			formData.append("product_color", this.state.product_color);
			formData.append("storage_capacity", this.state.storage_capacity);
			formData.append("camera_resolution", this.state.camera_resolution);
			formData.append("sim_card_slot", this.state.sim_card_slot);
			formData.append("ram_memory_card", this.state.ram_memory_card);
			formData.append("interior", this.state.interior);
			formData.append("exterior", this.state.exterior);
			formData.append("video_file_link", this.state.video_file_link);
			formData.append("youtube", this.state.youtube);
			formData.append("sale_by", this.state.sale_by);
			formData.append("selling_duration", this.state.selling_duration);
			formData.append("selling_price", this.state.selling_price);
			formData.append("selling_quantity", this.state.selling_quantity);
			formData.append("domestic_return", this.state.domestic_return);
			formData.append("international_return", this.state.international_return);
	
			
			
			
			
			axios({
			  method: "post",
			  url: this.api,
			  data: formData,
			  config: { headers: { "Content-Type": "multipart/form-data" } }
			 })
			 .then(response => {
				 window.scrollTo(0, 0);
				 this.loginForm.reset();
		  
				if (response.data.status) {
					
					this.addNotification();
				}
			  })
			  .catch(err => {
				console.log("Error: ", err);
			  });
			
		  }
		});
		
		
		
		
	};
	
    updateContent(newContent) {
        this.setState({
            description: newContent
        })
    } 

	onChange = (evt) => {
		
	  // console.log("onChange fired with event info: ", evt);
      var newContent = evt.editor.getData();
      this.setState({
        description: newContent
      })
	  this.setState({ errorDesc: null });

	  // alert(newContent);
	  
	 
		
    }
	
    handleChecked (e) {
		const { name, checked } = e.target;
		// alert(name);
		// alert(checked);
		this.setState({ [name]: e.target.checked });
		
		
		
		
	}
	
	handleChange = (e) => {
		
		const { name, value } = e.target;
		this.setState({ [name]: value });
		// alert(value);
		 // If a field has a validation error, we'll clear it when corrected.
		const { errors } = this.state;
		if (name in errors) {
		  const validation = this.validator.errors;
		  this.validator.validate(name, value).then(() => {
			if (!validation.has(name)) {
			  delete errors[name];
			  this.setState({ errors });
			}
		  });
		}
	};
	
	handleBlur = (e) => {
		const { name, value } = e.target;
		// Avoid validation until input has a value.
		if (value === '') {
		  return;
		}

		const validation = this.validator.errors;
		this.validator.validate(name, value).then(() => {
		  if (validation.has(name)) {
			const { errors } = this.state;
			errors[name] = validation.first(name);
			this.setState({ errors });
		  }
		});

	};
	
	handleCatChange = (id) => {
	
		let formData = new FormData();
		
		formData.append("id", id);
		
		axios({
		  method: "post",
		  url: this.subCategoryfetch,
		  data: formData,
		  config: { headers: { "Content-Type": "multipart/form-data" } }
		 })
		 .then(response => {
			
			if (response.data) {
					// console.log(response.data.data)
					this.setState({ category:response.data.data });
					this.setState({ subCategory: [] });
			}
		  })
		  .catch(err => {
			console.log("Error: ", err);
		  });
		
		 
		
	}
	
	handleSubCatChange = (id) => {
		// alert(id);
		let formData = new FormData();
		
		formData.append("id", id);
		
		axios({
		  method: "post",
		  url: this.subCategoryfetch,
		  data: formData,
		  config: { headers: { "Content-Type": "multipart/form-data" } }
		 })
		 .then(response => {
			
			if (response.data) {
					console.log(response.data.data)
					this.setState({ subCategory:response.data.data });
			}
		  })
		  .catch(err => {
			console.log("Error: ", err);
		  });
		
		 
		
	}
	
		
	buildOptions() {
        var arr = [];
					
		arr.push(<option key="0" value="0">Select The Category</option>)
		{this.state.parentCategory.map((name, index) => (
         arr.push(<option key={name.id} value={name.id} onClick={() => {this.handleCatChange(name.id)}}>{name.name}</option>)
		))}

        return arr; 
    
		}

		
  
  render() {
    const { loading, error, apiMore } = this.state;
    const { adminAuthenticated } = this.props;
    const { jAdminAuthenticated } = this.props;
	
	const category = Array.from(this.state.category); 
	const subcategory = Array.from(this.state.subCategory);
	
	const productImages = Array.from(this.state.product_image); 
	
	const {  errors } = this.state;
	
	if (jAdminAuthenticated == 'read') {
      // return <Redirect to={from} />;
	  return <Redirect to={window.appUrl+'admin/products'} />;
    }
	
	if (!adminAuthenticated) {
      // return <Redirect to={from} />;
	  return <Redirect to={window.appUrl} />;
    }
	  
   
    return (
      <div className="wrapper">
        
		<AdminHeaderNav />
		
		{/* Content Wrapper. Contains page content */}
      <div className="content-wrapper">
        {/* Content Header (Page header) */}
        <section className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h6>
					<Link to='products'>
						<button type="button" className="btn btn-sm btn-primary" ><i className="fa fa-arrow-circle-left"/>&nbsp; 
							Back
						</button>
					</Link>
				</h6>
              </div>
              <div className="col-sm-6">
			  <small>
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item"><Link to={window.appUrl+"admin/dashboard"}>Home</Link></li>
                  <li className="breadcrumb-item active">Add Product</li>
                </ol>
			  </small>
              </div>
            </div>
          </div>{/* /.container-fluid */}
        </section>
        {/* Main content */}
        <section className="content" style={{ maxWidth: '100%', textAlign: 'inherit'}}>
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
			  
					<Alert color="success" isOpen={this.state.visible}>
						<p>Product added <strong>successfully!</strong></p>
					</Alert>
					
                <div className="card card-primary card-outline">
				
					<div className="card-header">
					  <h3 className="card-title mb-0">
						Add Product&nbsp; 
						<i className="fa fa-file-text-o" />
					  </h3>
					</div>
                  {/* /.card-header */}
                 
				 <div className="container">
					<div className="row">
					  <div className="section-login col-lg-12 ml-auto mr-auto">

						<div className="card-login mb-3">
						  <div className="card-body">
							
							<form
							
							  className="form-horizontal "
							  method="POST"
							  onSubmit={this.handleSubmit}
							  ref={(el) => {
								this.loginForm = el;
							  }}
							>       
								
								
								
								
								<div className="row">
								
									<div className="col-sm-12">
									  {/* text input */}
									  <div className="form-group">
										<label htmlFor="title">Product Title</label>
										 <input
											id="title"
											type="text"
											className={classNames('form-control', {
											  'is-invalid': 'title' in errors,
											})}
											name="title"
											placeholder="Enter product title"
											onChange={this.handleChange}
											onBlur={this.handleBlur}
										required
										  />
										  {'title' in errors && (
											<div className="invalid-feedback">
											  {errors.title}
											</div>
										  )}
									  </div>
									  </div>
									</div>
									<div className="row">
									<div className="col-sm-12">
									  <div className="form-group">
										<label htmlFor="sub_title">Sub Title</label>
										 <input
											id="sub_title"
											type="text"
											className={classNames('form-control', {
											  'is-invalid': 'sub_title' in errors,
											})}
											name="sub_title"
											placeholder="Enter product subtitle"
											onChange={this.handleChange}
											onBlur={this.handleBlur}
                                           required
										  />
										  {'sub_title' in errors && (
											<div className="invalid-feedback">
											  {errors.sub_title}
											</div>
										  )}
									  </div>
									</div>
									
							   </div>
								
								
								<fieldset 
									style={{border: '1px solid #c0c0c0', margin: '0 2px'}}
								>
								<div className="form-group d-flex">
								
								  <div className="col-md-4 col-sm-6">
									<label htmlFor="product_category">Category</label>                 
																																	   																							   
									  <select name="product_category" size={7}
										onChange={this.handleChange}
										onBlur={this.handleBlur}
										className='form-control'
									  >
										{this.buildOptions()}
										
									  </select>
								   </div>
								   
								   {category.length > 0 &&
								   <div className="col-md-4 col-sm-6">
									<label htmlFor="product_category">&nbsp;</label>                 
																																	   																							   
									  <select name="product_category" size={7}
										onChange={this.handleChange}
										onBlur={this.handleBlur}
										className='form-control'
									  >
										{category.map((val,key) => (
											<option key={key} value={val.id} onClick={ ()=> {this.handleSubCatChange(val.id)}}>{val.name}</option>
										))}
										
									  </select>
								   </div>
								    }
									{subcategory.length > 0 &&
								   <div className="col-md-4 col-sm-6">
									<label htmlFor="product_category">&nbsp;</label>                 
																																	   																							   
									  <select name="product_category" size={7}
										onChange={this.handleChange}
										onBlur={this.handleBlur}
										className='form-control'
									  >
										{subcategory.map((val,key) => (
											<option key={key} value={val.id}>{val.name}</option>
										))}
										
									  </select>
								   </div>
									}
								   
									  
								 </div>
								 
								 
								</fieldset >
								
								  <label htmlFor=''>Description: &nbsp;
								                      


									{this.state.errorDesc && <small className="text-red">&nbsp;{this.state.errorDesc}</small>}
								  </label>
								 
								  <CKEditor 
								  
                                      
									activeClass="p10" 
									content={this.state.description} 
									required
									events={{
									  "blur": this.onBlur,
									  "afterPaste": this.afterPaste,
									  "change": this.onChange
									  
									}}
									
								   />
								  
								
									<div className="row">
									<div className="col-sm-6">
									  <div className="form-group">
										  <label htmlFor="vin">Vin</label>
										  <input
											id="vin"
											type="text"
											className={classNames('form-control', {
											  'is-invalid': 'vin' in errors,
											})}
											name="vin"
											placeholder="Enter Vin"
											onChange={this.handleChange}
											onBlur={this.handleBlur}
										  />
										  
										  {'vin' in errors && (
											<div className="invalid-feedback">
											  {errors.vin}
											</div>
										  )}
										</div>
									</div>
									</div>
									
									
									{/*  product image upload start*/}
									<fieldset 
									  style={{border: '1px solid #c0c0c0', margin: '0 2px'}}
									>
									<div className="form-group">
									  <label htmlFor="product_image">Product Image</label>
										
										<div id="picture" style={{display: 'block'}} className='py-3 px-3'>
											<div className='d-flex'>
											{this.state.product_image != null &&
											  productImages.slice((productImages.length - 1), productImages.length).map((options, key) => ( 
												<div style={{visibility: 'visible', animationDuration: '1.8s', animationName: 'fadeIn'}}>
												  <input 
												    id="imageUploads" 
													type="file" 
													name="product_image" 
													onChange={this.uploadMultipleFiles} 
													multiple="multiple"
													style={{zIndex: '10', marginTop: '-14px', opacity: '0', height: '150px', position: 'absolute', width: '150px'}}
												  />
												  <div style={{zIndex: '100', position: 'relative', textAlign: 'right', marginRight: '10%', top: '-31%'}}> 
												    <span onClick={() => this.resetFile(options)} ><i className="fa fa-times-circle-o" /></span>
												  </div>
												  
												  <div className="pr-3" style={{position: 'relative', float: 'left', marginTop: '-20%',width: '200px', marginLeft: '-2px', height: '175px'}} >
												  <img className="w-100" src={options} style={{width: '200px !important', height: '175px', background: 'white', border: '2px dashed #ccc',visibility: 'visible', animationDuration: '1.8s', animationName: 'fadeIn'}}/>
												</div>
											  </div>
											))
											}
											
											<div 
											  style={{visibility: 'visible', 
												animationDuration: '1.8s', 
												animationName: 'fadeIn', 
												width: '120px', 
												height: '120px', 
												textAlign: 'center', 
												marginTop: '10px',
												border: '2px dashed #ccc',
												color: '#ccc',
												fontSize: '13pt',
												float: 'left',
												marginRight: '9px',
												marginBottom: '5px',}}>
											  <input 
												id="imageUploads" 
												type="file" 
												name="product_image" 
												onChange={this.uploadMultipleFiles} 
												multiple="multiple"
												style={{zIndex: '10', marginTop: '-14px', opacity: '0', height: '120px', position: 'absolute', width: '120px'}}
											  />
											 <i className="fa fa-plus picture_bx_file_add mt-4" /> 
											 <p>Add Photos</p>
											  
										   </div>
										  
										   {this.state.product_image.length >= 2 &&
											  productImages.slice(0, (productImages.length - 1)).map((options, key) => ( 
												<div style={{visibility: 'visible', animationDuration: '1.8s', animationName: 'fadeIn'}}>
												  <input 
												    id="imageUploads" 
													type="file" 
													name="product_image" 
													onChange={this.uploadMultipleFiles} 
													multiple="multiple"
													style={{zIndex: '10', marginTop: '-14px', opacity: '0', height: '120px', position: 'absolute', width: '120px'}}
												  />
												  <div style={{zIndex: '100', position: 'relative', textAlign: 'right', marginRight: '10%', top: '-31%'}}> 
												    <span onClick={() => this.resetFile(options)} ><i className="fa fa-times-circle-o" /></span>
												  </div>
												  
												  <div className="pr-3" style={{position: 'relative', float: 'left', marginTop: '-38%',width: '120px', marginLeft: '-2px', height: '120px'}} >
												  <img className="w-100" src={options} style={{width: '120px !important', height: '120px', background: 'white', border: '2px dashed #ccc',visibility: 'visible', animationDuration: '1.8s', animationName: 'fadeIn'}}/>
												</div>
											  </div>
											))
											}
											
										  </div>
										</div>
										
										
										
                
										
									</div>
									</fieldset>
								
								{/*  product image upload end*/}
									<div className="row">
									<div className="col-sm-6">
									  <div className="form-group">
										  <label htmlFor="product_condition">Product  Condition</label>
										  <input
											id="product_condition"
											type="text"
											className={classNames('form-control', {
											  'is-invalid': 'product_condition' in errors,
											})}
											name="product_condition"
											placeholder="Enter product Condition"
											onChange={this.handleChange}
											onBlur={this.handleBlur}
										  />
										  
										  {'product_condition' in errors && (
											<div className="invalid-feedback">
											  {errors.product_condition}
											</div>
										  )}
										</div>
									</div>
									
							   </div>
							   
								
							
								
								<div className="form-group">
								  <label htmlFor="product_brand">Product Brand</label>
								  <input
									id="product_brand"
									type="text"
									className={classNames('form-control', {
									  'is-invalid': 'product_brand' in errors,
									})}
									name="product_brand"
									placeholder="Enter product Brand"
									onChange={this.handleChange}
									onBlur={this.handleBlur}
								  />
								  
								  {'product_brand' in errors && (
									<div className="invalid-feedback">
									  {errors.product_brand}
									</div>
								  )}
								</div>
									
								<div className="form-group">
								  <label htmlFor="product_year">Product Year</label>
								 <DatePicker
								    className="form-control"
									selected={this.state.startDate}
									onChange={this.handleDate}
									showYearPicker
									yearDropdownItemNumber={15}
									dateFormat="yyyy"
								 />
								  
								 
								</div>

								
								<div className="form-group">
								  <label htmlFor="fuel_type">Fuel Type</label>
								  <input
									id="fuel_type"
									type="text"
									className={classNames('form-control', {
									  'is-invalid': 'fuel_type' in errors,
									})}
									name="fuel_type"
									placeholder="Enter Fuel Type"
									onChange={this.handleChange}
									onBlur={this.handleBlur}
								  />
								  
								  {'fuel_type' in errors && (
									<div className="invalid-feedback">
									  {errors.fuel_type}
									</div>
								  )}
								</div>
								
								
							
							
							<fieldset 
							  style={{border: '1px solid #c0c0c0', margin: '0 2px', padding: '0.35em 0.625em 0.75em', display: 'block', marginInlineStart: '2px', marginInlineEnd: '2px', paddingBlockStart: '0.35em', paddingInlineStart: '0.75em', paddingInlineEnd: '23.75em', paddingBlockEnd: '0.625em', minInlineSize: 'min-content', marginBottom: '1em'}}
							>
							  <legend>Tick The Require One </legend>
							  
								<div className="form-group">
								 
							
						
								  <label className="checkbox-inline">
									<input type="checkbox" defaultChecked={this.state.cd_player} name='cd_player'  onChange={this.handleChecked} />
									  &nbsp; Cd Player
									</label>
							
									
									&nbsp;
									&nbsp;
								
									<label className="checkbox-inline">
									  <input type="checkbox" name='anti_lock_brakes' defaultChecked={this.state.anti_lock_brakes} onChange={this.handleChecked}
									 />
									   &nbsp; Anti-locks brakes
									</label>
								
									&nbsp;
									&nbsp;
							
									<label className="checkbox-inline">
									  <input type="checkbox" name='air_conditioning' defaultChecked={this.state.air_conditioning}  onChange={this.handleChecked}
									/>
									  &nbsp; Air conditioning
									</label>
									
									&nbsp;
									&nbsp;
									<label className="checkbox-inline">
									  <input type="checkbox" name='power_seat' defaultChecked={this.state.power_seat}  onChange={this.handleChecked}
									/>
									   &nbsp; Power Seat
									</label>
									&nbsp;
									&nbsp;
									<label className="checkbox-inline">
									  <input type="checkbox" name='power_locks' defaultChecked={this.state.power_locks}  onChange={this.handleChecked}
									 />
									 &nbsp;	Power Locks
									</label>
									&nbsp;
									<label className="checkbox-inline">
									  <input type="checkbox" name='cruise_control' defaultChecked={this.state.cruise_control}  onChange={this.handleChecked}
									/>
										 &nbsp; Cruise Control
									</label>
									&nbsp;
									&nbsp;
									<label className="checkbox-inline">
									  <input type="checkbox" name='suv' defaultChecked={this.state.suv}  onChange={this.handleChecked}
									 />
									 &nbsp;	Suv
									</label>
									&nbsp;
									&nbsp;
									<label className="checkbox-inline">
									  <input type="checkbox" name='air_bags' defaultChecked={this.state.air_bags} onChange={this.handleChecked}
									 />
										 &nbsp; Air Bags
									</label>
									&nbsp;
									&nbsp;
									<label className="checkbox-inline">
									  <input type="checkbox" name='sunroof' defaultChecked={this.state.sunroof}  onChange={this.handleChecked}
									/>
										 &nbsp; Sunroof
									</label>
									
								  </div>
								  
							</fieldset>
									
								
							 	<fieldset 
								style={{border: '1px solid #c0c0c0', margin: '0 2px', padding: '0.35em 0.625em 0.75em', display: 'block', marginInlineStart: '2px', marginInlineEnd: '2px', paddingBlockStart: '0.35em', paddingInlineStart: '0.75em', paddingInlineEnd: '23.75em', paddingBlockEnd: '0.625em', minInlineSize: 'min-content', marginBottom: '1em'}}
									>	
									
								<div className="row">
								<div className="col-sm-4">
										
									<div className="form-group">
								  <label htmlFor="engine">Engine</label>
								  <input
									id="engine"
									type="text"
									className={classNames('form-control', {
									  'is-invalid': 'engine' in errors,
									})}
									name="engine"
									placeholder="Enter data"
									onChange={this.handleChange}
									onBlur={this.handleBlur}
								  />
								  
								  {'engine' in errors && (
									<div className="invalid-feedback">
									  {errors.engine}
									</div>
									 )}
									 </div>
									 </div>
								  	<div className="col-sm-4">
								  <div className="form-group">
								  <label htmlFor="transmission">Transmission</label>
								  <input
									id="transmission"
									type="text"
									className={classNames('form-control', {
									  'is-invalid': 'transmission' in errors,
									})}
									name="transmission"
									placeholder="Enter Transmission"
									onChange={this.handleChange}
									onBlur={this.handleBlur}
								  />
								  
								  {'transmission' in errors && (
									<div className="invalid-feedback">
									  {errors.transmission}
									</div>
								  )}
								</div>
								</div>
								   <div className="col-sm-4">
								   <div className="form-group">
								  <label htmlFor="warrenty">Warrenty</label>
								  <input
									id="warrenty"
									type="text"
									className={classNames('form-control', {
									  'is-invalid': 'warrenty' in errors,
									})}
									name="warrenty"
									placeholder="Enter Warrenty"
									onChange={this.handleChange}
									onBlur={this.handleBlur}
								  />
								  
								  {'warrenty' in errors && (
									<div className="invalid-feedback">
									  {errors.warrenty}
									</div>
								  )}
								</div>
								</div>
								  </div>
										<div className="row">
									<div className="col-sm-4">
									<div className="form-group">
									<label htmlFor="product_make">Product Make</label>
									<input
									id="product_make"
									type="text"
									className={classNames('form-control', {
									  'is-invalid': 'product_make' in errors,
									})}
									name="product_make"
									placeholder="Enter product make"
									onChange={this.handleChange}
									onBlur={this.handleBlur}
								  />
								  
								  {'product_make' in errors && (
									<div className="invalid-feedback">
									  {errors.product_make}
									</div>
								  )}
								</div>
								</div>
								</div>
								  
								 

							
							
								  <div className="row">
								<div className="col-sm-4">
								<div className="form-group">
								  <label htmlFor="product_model">Product Model</label>
								  <input
									id="product_model"
									type="text"
									className={classNames('form-control', {
									  'is-invalid': 'product_model' in errors,
									})}
									name="product_model"
									placeholder="Enter Model"
									onChange={this.handleChange}
									onBlur={this.handleBlur}
								  />
								  
								  {'product_model' in errors && (
									<div className="invalid-feedback">
									  {errors.product_model}
									</div>
								  )}
								</div>
								</div>
								<div className="col-sm-4">
								<div className="form-group">
								  <label htmlFor="product_color">Product Color</label>
								  <input
									id="product_color"
									type="text"
									className={classNames('form-control', {
									  'is-invalid': 'product_color' in errors,
									})}
									name="product_color"
									placeholder="Enter Product color"
									onChange={this.handleChange}
									onBlur={this.handleBlur}
								  />
								  
								  {'product_color' in errors && (
									<div className="invalid-feedback">
									  {errors.product_color}
									</div>
								  )}
								</div>
								</div>
								
									<div className="col-sm-4">
								<div className="form-group">
								  <label htmlFor="storage_capacity">Product Storage Capacity</label>
								  <input
									id="storage_capacity"
									type="text"
									className={classNames('form-control', {
									  'is-invalid': 'storage_capacity' in errors,
									})}
									name="storage_capacity"
									placeholder="Enter Product  Storage Capacity"
									onChange={this.handleChange}
									onBlur={this.handleBlur}
								  />
								  
								  {'storage_capacity' in errors && (
									<div className="invalid-feedback">
									  {errors.storage_capacity}
									</div>
								  )}
								</div>
								</div>
									
								</div>
							
								
								
								</fieldset>
							
								<fieldset 
							  style={{border: '1px solid #c0c0c0', margin: '0 2px', padding: '0.35em 0.625em 0.75em', display: 'block', marginInlineStart: '2px', marginInlineEnd: '2px', paddingBlockStart: '0.35em', paddingInlineStart: '0.75em', paddingInlineEnd: '23.75em', paddingBlockEnd: '0.625em', minInlineSize: 'min-content', marginBottom: '1em'}}
							>
								<div className="row">
								<div className="col-sm-4">
							<div className="form-group">
								  <label htmlFor="camera_resolution"> Camera Resoultion</label>
								  <input
									id="camera_resolution"
									type="text"
									className={classNames('form-control', {
									  'is-invalid': 'camera_resolution' in errors,
									})}
									name="camera_resolution"
									placeholder="Enter  Camera Resoultion"
									onChange={this.handleChange}
									onBlur={this.handleBlur}
								  />
								  
								  {'camera_resolution' in errors && (
									<div className="invalid-feedback">
									  {errors.camera_resolution}
									</div>
								  )}
								</div>
								</div>
								
								<div className="col-sm-4">
								<div className="form-group">
								  <label htmlFor="sim_card_slot"> Sim Card Slot </label>
								  <input
									id="sim_card_slot"
									type="text"
									className={classNames('form-control', {
									  'is-invalid': 'sim_card_slot' in errors,
									})}
									name="sim_card_slot"
									placeholder="Sim Card Slot"
									onChange={this.handleChange}
									onBlur={this.handleBlur}
								  />
								  
								  {'sim_card_slot' in errors && (
									<div className="invalid-feedback">
									  {errors.sim_card_slot}
									</div>
								  )}
								</div>
							</div>
							
							
				
							<div className="col-sm-4">
								<div className="form-group">
								  <label htmlFor="ram_memory_card"> Ram / Memory Card </label>
								  <input
									id="ram_memory_card"
									type="text"
									className={classNames('form-control', {
									  'is-invalid': 'ram_memory_card' in errors,
									})}
									name="ram_memory_card"
									placeholder="Enter Ram / Memory Card"
									onChange={this.handleChange}
									onBlur={this.handleBlur}
								  />
								  
								  {'ram_memory_card' in errors && (
									<div className="invalid-feedback">
									  {errors.ram_memory_card}
									</div>
								  )}
								</div>
								</div>
								</div>
								
								
								 <div className="row">
								<div className="col-sm-4">
								
								
								<div className="form-group">
								  <label htmlFor="ram_memory_card"> Ram / Memory Card </label>
								  <input
									id="ram_memory_card"
									type="text"
									className={classNames('form-control', {
									  'is-invalid': 'ram_memory_card' in errors,
									})}
									name="ram_memory_card"
									placeholder="Enter Ram / Memory Card"
									onChange={this.handleChange}
									onBlur={this.handleBlur}
								  />
								  
								  {'ram_memory_card' in errors && (
									<div className="invalid-feedback">
									  {errors.ram_memory_card}
									</div>
								  )}
								</div>
								
								</div>
								<div className="col-sm-4">
								
								<div className="form-group">
								  <label htmlFor="interior">Interior</label>
								  <input
									id="interior"
									type="text"
									className={classNames('form-control', {
									  'is-invalid': 'interior' in errors,
									})}
									name="interior"
									placeholder="Enter Interior"
									onChange={this.handleChange}
									onBlur={this.handleBlur}
								  />
								  
								  {'interior' in errors && (
									<div className="invalid-feedback">
									  {errors.interior}
									</div>
								  )}
								</div>
								</div>
								<div className="col-sm-4">
								<div className="form-group">
								  <label htmlFor="exterior">Exterior</label>
								  <input
									id="exterior"
									type="text"
									className={classNames('form-control', {
									  'is-invalid': 'exterior' in errors,
									})}
									name="exterior"
									placeholder="Enter exterior"
									onChange={this.handleChange}
									onBlur={this.handleBlur}
								  />
								  
								  {'exterior' in errors && (
									<div className="invalid-feedback">
									  {errors.exterior}
									</div>
								  )}
								</div>
								
								</div>
								</div>
								
								</fieldset>
								
								
									
								  
							
								
								
								

								
								
								<div className="form-group">
								  <label htmlFor="video_file_link">Video File Link</label>
								  <input
									id="video_file_link"
									type="url"
									className={classNames('form-control', {
									  'is-invalid': 'video_file_link' in errors,
									})}
									name="video_file_link"
									placeholder="Enter Video File Link"
									onChange={this.handleChange}
									onBlur={this.handleBlur}
								  />
								  
								  {'video_file_link' in errors && (
									<div className="invalid-feedback">
									  {errors.video_file_link}
									</div>
								  )}
								</div>	
								<div className="form-group">
								  <label htmlFor="youtube">Youtube Link</label>
								  <input
									id="youtube"
									type="url"
									className={classNames('form-control', {
									  'is-invalid': 'youtube' in errors,
									})}
									name="youtube"
									placeholder="Enter  YouTube Link"
									onChange={this.handleChange}
									onBlur={this.handleBlur}
								  />
								  
								  {'youtube' in errors && (
									<div className="invalid-feedback">
									  {errors.youtube}
									</div>
								  )}
								</div>
										<div className="form-group">
										  <label htmlFor="sale_by">Sale By</label>
										  <input
											id="sale_by"
											type="text"
											className={classNames('form-control', {
											  'is-invalid': 'sale_by' in errors,
											})}
											name="sale_by"
											placeholder="Sale By"
											onChange={this.handleChange}
											onBlur={this.handleBlur}
										  />
										  
										  {'sale_by' in errors && (
											<div className="invalid-feedback">
											  {errors.sale_by}
											</div>
										  )}
										</div>
										
									<div className="form-group">
								  <label htmlFor="selling_duration">Selling Duration</label>
								  <input
									id="selling_duration"
									type="text"
									className={classNames('form-control', {
									  'is-invalid': 'selling_duration' in errors,
									})}
									name="selling_duration"
									placeholder="Enter Selling Duration"
									onChange={this.handleChange}
									onBlur={this.handleBlur}
								  />
								  
								  {'selling_duration' in errors && (
									<div className="invalid-feedback">
									  {errors.selling_duration}
									</div>
								  )}
								</div>
									<div className="form-group">
								  <label htmlFor="selling_price">Product Selling Price</label>
								  <input
									id="selling_price"
									type="number"
									step="0.01"
									className={classNames('form-control', {
									  'is-invalid': 'selling_price' in errors,
									})}
									name="selling_price"
									placeholder="Enter Selling Price"
									onChange={this.handleChange}
									onBlur={this.handleBlur}
								  />
								  
								  {'selling_price' in errors && (
									<div className="invalid-feedback">
									  {errors.selling_price}
									</div>
								  )}
								</div>
									
									<div className="form-group">
								  <label htmlFor="selling_quantity">Selling Quantity</label>
								  <input
									id="selling_quantity"
									type="text"
									className={classNames('form-control', {
									  'is-invalid': 'selling_quantity' in errors,
									})}
									name="selling_quantity"
									placeholder="Enter Selling Quantity"
									onChange={this.handleChange}
									onBlur={this.handleBlur}
								  />
								  
								  {'selling_quantity' in errors && (
									<div className="invalid-feedback">
									  {errors.selling_quantity}
									</div>
								  )}
								</div>
	
								<style dangerouslySetInnerHTML={{__html: "\n.switch {\n  position: relative;\n  display: inline-block;\n  width: 60px;\n  height: 34px;\n}\n\n.switch input { \n  opacity: 0;\n  width: 0;\n  height: 0;\n}\n\n.slider {\n  position: absolute;\n  cursor: pointer;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  background-color: #ccc;\n  -webkit-transition: .4s;\n  transition: .4s;\n}\n\n.slider:before {\n  position: absolute;\n  content: \"\";\n  height: 26px;\n  width: 26px;\n  left: 4px;\n  bottom: 4px;\n  background-color: white;\n  -webkit-transition: .4s;\n  transition: .4s;\n}\n\ninput:checked + .slider {\n  background-color: #2196F3;\n}\n\ninput:focus + .slider {\n  box-shadow: 0 0 1px #2196F3;\n}\n\ninput:checked + .slider:before {\n  -webkit-transform: translateX(26px);\n  -ms-transform: translateX(26px);\n  transform: translateX(26px);\n}\n\n/* Rounded sliders *//* \n.slider.round {\n  border-radius: 34px;\n}\n\n.slider.round:before {\n  border-radius: 50%;\n}\n" }} /> 
									
									<div className="form-group">
									
									<label htmlFor="domestic_return">Domestic Return</label>
									<br/>
								
										<label className="switch">
										  <input 
											type="checkbox" 
											name='domestic_return' 
											defaultChecked={this.state.domestic_return} 
											onChange={this.handleChecked}
										 />
										 <span className="slider round" />
										</label>
								
									
								
								   
								   </div>
								   
										
							
								<div className="form-group">
								<label htmlFor="international_return">International Return</label>
									<br/>
									
									<label className="switch">
									  <input 
									    type="checkbox" 
										name='international_return' 
										defaultChecked={this.state.international_return} 
										onChange={this.handleChecked}
									 />
									 <span className="slider round" />
									</label>
							     </div>
								
									
								

								
								
								
								<div className="form-group text-center">
								  <div className="col-md-3 col-lg-3 col-sm-6">
									<button
									  type="submit"
									  className='btn btn-primary'
									  disabled={this.state.isLoading}
									>
									{this.state.isLoading ? "Loading..." : "Submit"}
									 
									</button>
								  </div>
								  </div>
						
							  </form>
						  
						  </div>
						</div>

						
					  </div>
					</div>
				  </div>
		  
                </div>
               
              </div>
              {/* /.col */}
            </div>
            {/* /.row */}
          </div>
          {/* /.container-fluid */}
        </section>
        {/* /.content */}
      </div>
	  
        <AdminFooter />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.Auth.isAuthenticated,
  adminAuthenticated: state.Auth.adminAuthenticated,
  jAdminAuthenticated: state.Auth.jAdminAuthenticated,
  user: state.Auth.user,
});

export default connect(mapStateToProps)(AddProduct);
