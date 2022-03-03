import React, { useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { addEducation } from "../../actions/profile";

const AddEducation = ({ addEducation }) => {
	// const navigate = useNavigate();
	const [formData, setFormData] = useState({
		school: "",
		degree: "",
		fieldofstudy: "",
		from: "",
		to: "",
		current: false,
		description: "",
	});

	const [toDateDisabled, toggleDisabled] = useState(false);
	const { school, degree, fieldofstudy, from, to, current, description } =
		formData;

	const onChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};
	return (
		<section className="container">
			<h1 className="large text-primary">Add Your Education</h1>
			<p className="lead">
				<i className="fas fa-code-branch"></i> Add aany school that you
				have attended
			</p>
			<small>* = required field</small>
			<form
				className="form"
				onSubmit={(e) => {
					e.preventDefault();
					addEducation(formData);
				}}
			>
				<div className="form-group">
					<input
						type="text"
						placeholder="* School Name"
						name="school"
						value={school}
						onChange={(e) => onChange(e)}
					/>
				</div>
				<div className="form-group">
					<input
						type="text"
						placeholder="* Degree"
						name="degree"
						value={degree}
						onChange={(e) => onChange(e)}
					/>
				</div>
				<div className="form-group">
					<input
						type="text"
						placeholder="Field of study"
						name="fieldofstudy"
						value={fieldofstudy}
						onChange={(e) => onChange(e)}
					/>
				</div>
				<div className="form-group">
					<h4>From Date</h4>
					<input
						type="date"
						name="from"
						value={from}
						onChange={(e) => onChange(e)}
					/>
				</div>
				<div className="form-group">
					<p>
						<input
							type="checkbox"
							name="current"
							value={current}
							onChange={(e) => {
								setFormData({ ...formData, current: !current });
								toggleDisabled(!toDateDisabled);
							}}
							checked={current}
						/>{" "}
						Current Job
					</p>
				</div>
				<div className="form-group">
					<h4>To Date</h4>
					<input
						type="date"
						name="to"
						value={to}
						onChange={(e) => onChange(e)}
						disabled={toDateDisabled ? "disabled" : ""}
					/>
				</div>
				<div className="form-group">
					<textarea
						name="description"
						cols="30"
						rows="5"
						placeholder="Job Description"
						value={description}
						onChange={(e) => onChange(e)}
					></textarea>
				</div>
				<input type="submit" className="btn btn-primary my-1" />
				<Link className="btn btn-light my-1" to="/dashboard">
					Go Back
				</Link>
			</form>
		</section>
	);
};

export default connect(null, { addEducation })(AddEducation);
