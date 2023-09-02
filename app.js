const dataContainer = async (id) => {
    const res = await fetch(
      `https://openapi.programming-hero.com/api/videos/category/${id}`
    );
    const data = await res.json();
    if ((data.status = true)) {
      const getData = data.data;
      
      let allCard = document.getElementById("cardContainer");
        allCard.innerHTML=""
        if(getData.length===0){
          const div = document.createElement('div')
           div.classList = "col-span-full"
          div.innerHTML = `
             <div >
             <img class="mx-auto" src="Icon.png">
             <p class="text-3xl font-semibold">Sorry! There is  no data here</p>
             </div>
          `
          allCard.appendChild(div)
        }
      getData.forEach((data) => {
        const card = document.createElement("div");
        const hour = parseInt(parseInt(data.others.posted_date)/3600);
        const min = parseInt(((parseInt(data.others.posted_date)/3600)-hour)/60)
        console.log(data);
        card.innerHTML = `
      <div class="card w-full bg-base-100 shadow-xl ">
          <figure class="relative">
          <img class="w-full h-[200px]" src=${data.thumbnail} alt="Shoes" />
          ${
            data.others.posted_date ? `<span class="bg-black text-white absolute px-3 bottom-3 right-3">${hour}hrs ${min}min ago</span>` : ``
          }
          
          </figure>
          <div class="card-body">
            <div class="flex gap-10">
            <img src=${data.authors[0]?.profile_picture} alt="ProfilePic" class="w-10 h-10 rounded-full" />
  
            <div class="space-y-2">
            <p class="text-xl font-bold">${data.title}</p>
            <div class='flex gap-3'>
            <span>${data.authors[0]?.profile_name}</span>
            
            ${data.authors[0]?.verified? `<img src='./thik.svg'>` : ``}
            </div>
            <p><span>${data.others.views}</span> views</p>

            </div>
          </div>
         
  
          </div>
        </div>
      `;
        allCard.appendChild(card);
      });
  
      console.log(data.data);
    } else {
      alert("Something went wrong");
    }
  };
  
  
  const getCatagory =async()=>{
      const res = await fetch(
          `https://openapi.programming-hero.com/api/videos/categories`
        );
        const data = await res.json();
        const video = data.data
        console.log(video)
        
        video.forEach((video)=>{
          const btnContainer = document.getElementById('button-container')
          
          btnContainer.innerHTML += `
        
        <a class="tab btn" onclick="dataContainer(${video.category_id}) ">${video.category}</a>
          `
        })
  
  dataContainer(1000)
  }
  getCatagory()
  
  const sort =()=>{
      const video = [];
      const videoContainer = document.getElementById('cardContainer')
      console.log(videoContainer.children[0].childNodes[1].childNodes[3].childNodes[1].childNodes[3].childNodes[5].childNodes[0].innerText)
     for(const videos of videoContainer.children){
      video.push(videos)
     }
      const sortedVideo = video.sort((a,b)=>parseInt(b.childNodes[1].childNodes[3].childNodes[1].childNodes[3].childNodes[5].childNodes[0].innerText)
      -
      parseInt(a.childNodes[1].childNodes[3].childNodes[1].childNodes[3].childNodes[5].childNodes[0].innerText)
      )
  
      sortedVideo.forEach(a=>{
          videoContainer.appendChild(a)
      })
      
  }