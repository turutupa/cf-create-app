using {managed} from '@sap/cds/common';

namespace bookshop;

entity Books : managed {
  key ID     : Integer;
      title  : localized String(111);
      descr  : localized String(1111);
      author : Association to Authors;
      stock  : Integer;
      price  : Decimal(9, 2);
}

entity Authors : managed {
  key ID           : Integer;
      name         : String(111);
      dateOfBirth  : Date;
      dateOfDeath  : Date;
      placeOfBirth : String;
      placeOfDeath : String;
      books        : Association to many Books
                       on books.author = $self;
}
