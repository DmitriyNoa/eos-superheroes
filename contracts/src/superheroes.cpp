#include <superheroes.hpp>

ACTION superheroes::clear() {
  require_auth(get_self());
}

ACTION superheroes::addhero(string superhero_name, string category, string avatar, string description) {
  require_auth(get_self());

  // init superheroes table
  heroes_table _heroes(get_self(), get_self().value);

  _heroes.emplace(get_self(), [&]( auto& row ) {
        row.id = _heroes.available_primary_key();
        row.superhero_name = superhero_name;
        row.category = category;
        row.avatar = avatar;
        row.description = description;
  });
}

ACTION superheroes::removehero(uint64_t id) {
  require_auth(get_self());

  heroes_table _heroes(get_self(), get_self().value);
  auto iterator = _heroes.find(id);
  check(iterator != _heroes.end(), "Superhero does not exist");
  _heroes.erase(iterator);
}

ACTION superheroes::removereview(uint64_t id) {
  require_auth(get_self());

  reviews_table _reviews(get_self(), get_self().value);
  auto iterator = _reviews.find(id);
  check(iterator != _reviews.end(), "Review does not exist");
  _reviews.erase(iterator);
}

ACTION superheroes::review(uint64_t superhero_id, uint64_t mark, string review_text) {
  heroes_table _heroes(get_self(), get_self().value);
  auto iterator = _heroes.find(superhero_id);
  check(iterator != _heroes.end(), "Superhero does not exist");

  reviews_table _reviews(get_self(), get_self().value);

  _reviews.emplace(get_self(), [&]( auto& row ) {
        row.id = _reviews.available_primary_key();
        row.superhero_id = superhero_id;
        row.mark = mark;
        row.review_text = review_text;
  });
}

EOSIO_DISPATCH(superheroes, (clear)(addhero)(removehero)(review)(removereview))
