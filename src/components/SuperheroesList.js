import React from "react";
const SuperheroesList = (props) => {
  const superheroes = props.superheroes.map((hero) => {
    return (
      <div className="col-md-3" key={hero.id}>
        <div className="media">
          <div className="media-body">
            <div className="mb-0">
              <h6>
                {hero.superhero_name}</h6>
            </div>
            <div className="mb-0">
              <img src={hero.avatar} width={200} alt=""/>
            </div>
          </div>
        </div>
      </div>
    )
  });

  return (
    <div className="row">
      {superheroes}
    </div>
  )
}

export  {
  SuperheroesList
}
