// DOM ELEMENTS
const mainContainer = document.getElementById('mainContainer')
const titleInput = document.getElementById('titleInput')
const textInput = document.getElementById('textInput')
const idInput = document.getElementById('idInput')
const footer = document.querySelector('.footer')
const header = document.querySelector('.header')
// DEFAULT VARIABLES
let PostData = []
let startForm = 0
let currentPageData = []
let currentPage = 0
let limit = 10
const BASE_URL = 'https://jsonplaceholder.typicode.com'
// MAIN FUNCTIONS => Fetching, singlePage for posts, searching, 



// fetching PostData
const fetchData = async (baseUrl,searchingEndPoint) => {
  try{
    const response = await fetch(`${baseUrl}/${searchingEndPoint}`)
    if(!response.ok){
      throw new Error('Server Error')
    }
    
    PostData = await response.json()

    Slicer(PostData,startForm,limit)

    TemplateData(currentPageData)

    return currentPageData
  }
  catch(error){
    return console.error(error)
  }
}

fetchData(BASE_URL, 'posts')
// slicer function - slicing PostData for pages

function Slicer(PostData, startForm, limit){
  currentPageData = PostData.slice(startForm  , startForm + limit)
  return currentPageData
}

// templating PostData

function TemplateCard(title, body, id){
  return(
    `
      <div class="card p-1rem d-flex fl-d-col j-c-evenly aling-center">
      <div class="card-header d-flex fl-d-col text-cetner" > 
      ${title} <span> id:${id}</span>
      </div>
      <div class="card-body">
      ${body}
      </div>
        <div class="card-footer">
        <button class="btn btn-success" onclick="onClickBtn(${id})">  
            more info...  
            </button>
            </div>
            </div>
            `
        )
    }
function TemplateData(PostData){
  templated = PostData.map(item => {
    
    return TemplateCard(item.title, item.body, item.id)
  })
  mainContainer.innerHTML = templated.join('')
}

// templating individual page data
function TemplateIndividPageData(data){  
  const TemplateIndivid = data.map(item => {
    return `
    <button class="goBackBtn br-10" onclick="onClickGoBack()"><-GO BACK</button>
      <div class="br-10 back-grey-heat w-100 h-70vh d-flex j-c-center align-center">
        <div class='w-50 h-50 d-flex fl-d-col j-c-evenly align-center '>
          <div>
            ${item.title}
          </div>
          <div>
            id: ${item.id}
          </div>
          <div>
            ${item.body}
          </div>
        </div>
      </div>
    `
  })
  mainContainer.innerHTML = TemplateIndivid
}





// pagination
function onClickNextPage(){
  if(startForm < PostData.length - limit){
    currentPage++

    startForm = currentPage * limit
    
    Slicer(PostData, startForm, limit) 
    
    TemplateData(currentPageData)
  }else{
    return alert('дальше нету')
  }
}

function onClickLastPage(){
  if(currentPage>0){
    currentPage--

    startForm = currentPage * limit
    
    Slicer(PostData, startForm, limit) 
    
    TemplateData(currentPageData)
  }else{
    return alert('дальше нету')
  }
}

titleInput.addEventListener('input' , e => {
  if(e.target.value !== ''){
    textInput.value = ''
    idInput.value = ''
    const value = e.target.value.toUpperCase();
    const filteredArr = PostData.filter(({title}) => title.toUpperCase().includes(value))
    TemplateData(filteredArr)
  }else if(e.target.value === ''){
    TemplateData(currentPageData)
  }
})

textInput.addEventListener('input' , e => {
  if(e.target.value !== ''){
    titleInput.value = ''
    idInput.value = ''
    const value = e.target.value.toUpperCase();
    const filteredArr = PostData.filter(({body}) => body.toUpperCase().includes(value))
    TemplateData(filteredArr)
  }else if(e.target.value === ''){
    TemplateData(currentPageData)
  }
})

idInput.addEventListener('input', e => {
  if(e.target.value !== ''){
    textInput.value = ''
    titleInput.value = ''
    const value = e.target.value.toUpperCase()
    const filteredArr = PostData.filter(({id}) => {
       return id.toString().includes(value)
    })
    TemplateData(filteredArr)
  }else if(e.target.value === ''){
    TemplateData(currentPageData)
  }
})

// individual page
 



function onClickBtn(ids){
  const filteredArr = PostData.filter(({id}) => {
    return id === ids
 })
 header.classList.add('deleted')
 footer.classList.add('deleted')
  TemplateIndividPageData(filteredArr)

}


function onClickGoBack(){
  header.classList.remove('deleted')
  footer.classList.remove('deleted')
  textInput.value = ''
  titleInput.value = ''
  idInput.value = ''
  TemplateData(currentPageData)
}



// fetching: done
// templating: done
// pagination whithout api : done
// searchings : done
// profile page : done



