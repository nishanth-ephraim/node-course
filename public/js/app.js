const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#messageOne')
const messageTwo = document.querySelector('#messageTwo')

weatherForm.addEventListener('submit', (e)=>{
	e.preventDefault()
	const loc = search.value
	messageOne.textContent = 'Loading........'
	messageTwo.textContent = ''
	
	fetch('http://localhost:3000/weather?address='+loc).then((response) =>{
		response.json().then((data) => {
			if(data.error)
				messageOne.textContent = data.error
			else{
				messageOne.textContent = data.location
				messageTwo.textContent = data.forecast
			}
			
		})
	})
})