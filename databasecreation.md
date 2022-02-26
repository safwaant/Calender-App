# Database Creation Document

## Used to create an instance of the database

```sql
\qecho Creating Database for Calendar . . .
\qecho
\qecho
SELECT current_database();
create database calendar;
\c calendar
SELECT current_database();

CREATE TABLE Person (
  ID SERIAL NOT NULL,
  Person_Name VARCHAR(20) NOT NULL,
  Person_Password VARCHAR(10) NOT NULL UNIQUE,

  PRIMARY KEY (ID)  
);

CREATE TABLE Group(
   Group_Code INT UNIQUE,
   Group_Name VARCHAR(20) NOT NULL,
   Creator_Name VARCHAR(20) NOT NULL,
   Group_Start TIME::DATE NOT NULL,
   Group_End TIME::DATE NOT NULL,
   Member_Count INT NOT NULL,

   PRIMARY KEY (Group_Code) 
);


CREATE TABLE GroupMembers (
  Group_Code INT,
  PersonID SERIAL,

  PRIMARY KEY (Group_Code, PersonID),
  FOREIGN KEY (Group_Code) REFERENCES Group(Group_Code),
  FOREIGN KEY (PersonID) REFERENCES Person(ID) 
);

CREATE TABLE PersonAvailableDays (
    ID SERIAL NOT NULL,
    Person_AvailableDay TIME::DATE NOT NULL,
    Person_ID SERIAL NOT NULL,

    PRIMARY KEY (ID),
    FOREIGN KEY (Person_ID) REFERENCES Person(ID)
);

CREATE TABLE Color (
    Number_People INTEGER(4) not null,
    Hex_Value VARCHAR(6) not null unique,

    Primary Key (Number_People)
);

CREATE TABLE GroupAvailableDays (
    ID SERIAL NOT NULL,
    Group_Code INT UNIQUE NOT NULL,
    Available_Day TIME::DATE NOT NULL,
    Num_People INT(4) NOT NULL,

    PRIMARY KEY (ID),
    FOREIGN KEY (Group_Code) REFERENCES Group(Group_Code),
    FOREIGN KEY (Num_People) REFERENCES Color(Number_People)
);

CREATE TABLE AvailableDaysJoin (
    Group_Avail_ID Serial not null,
    Person_Avail_ID Serial not null,

    Primary Key (Group_Avail_ID, Person_Avail_ID)
    Foreign Key (Person_Avail_ID) references PersonAvailableDays(ID),
        (Group_Avail_ID) references GroupAvailableDays(ID)
);



\c postgres
SELECT current_database();
DROP DATABASE calendar;
```