import React, { Component } from 'react'
import { FETCH_BY_CASES } from '../../services/Model'
import { ReactComponent as IconLeft } from '../../images/arrow-left.svg'
import { Link, Redirect } from 'react-router-dom'
import { Helmet } from 'react-helmet'

export default class Detail extends Component {
	state = {
		data: [],
		isLoading: true,
		redirect: false,
	}

	componentDidMount() {
		FETCH_BY_CASES().then(response => {
			if (!response) this.setState({ redirect: true })
			else
				this.setState(
					{
						data: response.data,
						isLoading: false,
					},
					() => console.log(this.state.data),
				)
		})
	}

	render() {
		if (this.state.redirect) return <Redirect to='/' />
		const { isLoading, data } = this.state
		const province = this.props.match.params.name
		const id = this.props.match.params.id
		const language = this.props.match.params.language

		return (
			<>
				<Helmet>
					<meta charSet='utf-8' />
					<title>IDN COVID 19 INFO - {province}</title>
					<meta name='indonesia covid19' content='covid19' />
				</Helmet>
				<div className='detail'>
					<Link to='/'>
						<IconLeft />
						<span style={{ marginLeft: 10, fontSize: 12 }}>
							{language === 'ID' ? 'Kembali' : 'Back'}
						</span>
					</Link>
					<div className='detail__title'>
						<h3>
							{language === 'ID'
								? 'DETAIL KASUS COVID-19 DI'
								: 'DETAIL COVID-19 CASES IN'}{' '}
							{province}
						</h3>
						<p>
							{language === 'ID'
								? 'Detail corona virus atau kasus COVID-19 di'
								: 'Detail corona viruses or COVID-19 cases in'}{' '}
							{province}
						</p>
					</div>

					{isLoading ? (
						<div>
							<center>
								<h2>Loading.....</h2>
							</center>
						</div>
					) : (
						<div className='detail__grid'>
							{data
								.filter(v => {
									return v.provinsi == id
								})
								.map(v => {
									return (
										<div className='detail__grid__item'>
											<p className='detail__grid__item__case'>
												{language == 'ID' ? 'Kasus' : 'Cases'} {v.id_pasien}
											</p>
											<p className='detail__grid__item__age'>
												{v.umur} {language === 'ID' ? 'Tahun' : 'Years Old'}
											</p>
											<p className='detail__grid__item__gender'>
												{v.jenis_kelamin === 1 && language === 'ID'
													? 'Perempuan'
													: v.jenis_kelamin === 1 && language === 'EN'
													? 'Female'
													: v.jenis_kelamin === 0 && language === 'ID'
													? 'Laki-laki'
													: 'Male'}
											</p>
											<p
												style={{
													whiteSpace: 'nowrap',
													overflow: 'hidden',
													fontSize: 12,
													width: '100%',
													textAlign: 'center',
												}}
											>
												"{v.keterangan}"
											</p>
											<p
												style={{
													color:
														v.id_status === 2
															? 'red'
															: v.id_status === 1
															? '#f2c94c'
															: 'green',
												}}
											>
												{v.id_status === 2 && language === 'ID'
													? 'Meninggal'
													: v.id_status === 2 && language === 'EN'
													? 'Death'
													: v.id_status === 1 && language === 'ID'
													? 'Dalam Perawatan'
													: v.id_status === 1 && language === 'EN'
													? 'Recovery'
													: v.id_status === 0 && language === 'ID'
													? 'Sembuh'
													: 'Recovered'}
											</p>
										</div>
									)
								})}
						</div>
					)}
				</div>
			</>
		)
	}
}
