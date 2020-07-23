using {bookshop as bookshop} from '../db/schema';

service BookshopService @(path : '/browse') {

  @readonly
  entity Books as
    select from bookshop.Books {
      *,
      author.name as author
    }
    excluding {
      createdBy,
      modifiedBy
    };

}
