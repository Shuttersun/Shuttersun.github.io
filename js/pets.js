document.addEventListener("DOMContentLoaded", () => {
  //Cards

  class Cards {
    constructor(src, alt, title, parent) {
      this.src = src;
      this.alt = alt;
      this.title = title;
      this.parent = document.querySelector(parent);
    }
    render() {
      const li = document.createElement("li");
      li.classList.add("pets-card__item");
      li.innerHTML = `
     <div class="pets-card__item-img-box">
     <img src=${this.src} alt=${this.alt} />
   </div>
   <div class="pets-card__item-dekr">
     <div class="pets-card__item-title">${this.title}</div>
     <a href="#" class="pets-card__item-btn link-btn">Learn More</a>
   </div>`;
      this.parent.append(li);
    }
  }

  const katrine = new Cards(
    "img/katrine.png",
    "Cute british cat",
    "Katrine",
    ".pets-card__list"
  );

  const jennifer = new Cards(
    "img/jennifer.png",
    "Little puppy",
    "Jennifer",
    ".pets-card__list"
  );

  const woody = new Cards(
    "img/woody.png",
    "Young golden labrador",
    "Woody",
    ".pets-card__list"
  );
  const sophia = new Cards(
    "img/sophia.png",
    "Small fluffy white puppy with black ears",
    "Sophia",
    ".pets-card__list"
  );
  const timmy = new Cards(
    "img/timmy.png",
    "British cat boy",
    "Timmy",
    ".pets-card__list"
  );
  const charly = new Cards(
    "img/charly.png",
    "Smart boy Charlie",
    "Charly",
    ".pets-card__list"
  );
  const scarlett = new Cards(
    "img/scarlett.png",
    "Little girl Jack Russell",
    "Scarlett",
    ".pets-card__list"
  );
  const freddie = new Cards(
    "img/freddie.png",
    "Little kitten boy",
    "Freddie",
    ".pets-card__list"
  );

  const pets = [
    katrine,
    jennifer,
    woody,
    sophia,
    timmy,
    charly,
    scarlett,
    freddie,
    freddie,
    scarlett,
    charly,
    timmy,
    sophia,
    woody,
    jennifer,
    katrine,
  ];

  // pets.forEach((pet) => pet.render());

  const paginationParent = document.querySelector(".pets-main");

  const currentElement = 8;
  let page = 1;

  const paginationElementFromPage = (pets, page, element) => {
    const cardRender = (pets, page) => {
      const li = document.querySelectorAll(".pets-card__item");
      li.forEach((i) => i.remove());
      const end = element * page;
      const start = end - element;

      pets.slice(start, end).forEach((pet) => pet.render());
    };

    cardRender(pets, page);

    const renderCheckbox = (pets, parent) => {
      const pageParent = parent;
      const currentLi = Math.ceil(pets.length / element);
      const ulEl = document.createElement("ul");
      ulEl.classList.add("pets-pagination-list");
      for (let i = 0; i < currentLi; i++) {
        const liEl = document.createElement("li");
        if (i === 0) {
          liEl.classList.add("pets-pagination-item--active");
        }
        liEl.classList.add("pets-pagination-item");
        liEl.textContent = i + 1;
        ulEl.append(liEl);
      }
      pageParent.append(ulEl);
      return pageParent;
    };
    renderCheckbox(pets, paginationParent);

    const checkbox = document.querySelectorAll(".pets-pagination-item");
    checkbox.forEach((check, index) => {
      check.addEventListener("click", (e) => {
        const target = e.target;
        if (target) {
          checkbox.forEach((i) =>
            i.classList.remove("pets-pagination-item--active")
          );

          check.classList.add("pets-pagination-item--active");
          page = index + 1;
          cardRender(pets, page);
        }
      });
    });
  };

  paginationElementFromPage(pets, page, currentElement);

  //Card animation

  const cards = document.querySelectorAll(".pets-card__item"),
    cardBtn = document.querySelectorAll(".pets-card__item-btn");

  cardBtn.forEach((btn, index) => {
    btn.addEventListener("mouseover", () => {
      cards.forEach((card, i) => {
        if (index === i) {
          card.style.cssText = `box-shadow: 0 0 15px rgba(0, 0, 0, 0.08)`;
        } else {
          card.style.boxShadow = `none`;
        }
      });
    });
    btn.addEventListener("mouseleave", () => {
      cards.forEach((card) => {
        card.style.boxShadow = `none`;
      });
    });
  });
});
