#include <eosio/eosio.hpp>
#include <eosio/print.hpp>

using namespace std;
using namespace eosio;

CONTRACT superheroes : public contract {
  public:
    using contract::contract;

    superheroes(name receiver, name code, datastream<const char*> ds):contract(receiver, code, ds) {}
    
    ACTION clear();
    ACTION addhero(string superhero_name, string category, string avatar, string description);
    ACTION removehero(uint64_t id);
    ACTION review(uint64_t superhero_id, uint64_t mark, string review_text);
    ACTION removereview(uint64_t id);

  private:

    TABLE Hero {
      uint64_t id;
      string superhero_name;
      string category;
      string avatar;
      string description;
      auto primary_key() const { return id; }
    };
    typedef multi_index<"heroes"_n, Hero> heroes_table;

    TABLE Review {
      uint64_t id;
      uint64_t superhero_id;
      uint64_t mark;
      string review_text;
      auto primary_key() const { return id; }
      uint64_t by_superheroid() const {return superhero_id; }
    };
    typedef multi_index<"reviews"_n, Review,
    indexed_by<"bysuperheroid"_n, const_mem_fun<Review, uint64_t, &Review::by_superheroid>>
    > reviews_table;

};
