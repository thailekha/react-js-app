function getMockLibraryManager() {
  return {
    calledMethods: [],
    previouslyCalledMethod(m){
      if (!this.calledMethods.includes(m)) {
        this.calledMethods.push(m);
      }
    },
    setLibraryHandler(){
      this.previouslyCalledMethod('setLibraryHandler');
    },
    search(){
      this.previouslyCalledMethod('search');
    },
    create(){
      this.previouslyCalledMethod('create');
    },
    delete(){
      this.previouslyCalledMethod('delete');
    },
    getAttr(attr){
      this.previouslyCalledMethod('getAttr');
      return {
        "id": 0,
        "email": "abc@yahoo.sample.com",
        "name": "Mock 1",
        "public": true,
        "paradigms": [],
        "programminglanguages": [],
        "havings": []
      }[attr];
    },
    addPL(){
      this.previouslyCalledMethod('addPL')
    },
    editPL(){
      this.previouslyCalledMethod('editPL')
    },
    getPL(){
      this.previouslyCalledMethod('getPL')
    },
    deletePL(){
      this.previouslyCalledMethod('deletePL')
    },
    getRelatedPDs(){
      this.previouslyCalledMethod('getRelatedPDs')
    },
    getPDID(){
      this.previouslyCalledMethod('getPDID')
    },
    addPD(){
      this.previouslyCalledMethod('addPD')
    },
    editPD(){
      this.previouslyCalledMethod('editPD')
    },
    getPD(){
      this.previouslyCalledMethod('getPD')
    },
    deletePD(){
      this.previouslyCalledMethod('deletePD')
    },
    libraryIsAvailable: true
  };
}

function getMockLibraryManagerWithData() {
  return {
    calledMethods: [],
    previouslyCalledMethod(m){
      if (!this.calledMethods.includes(m)) {
        this.calledMethods.push(m);
      }
    },
    setLibraryHandler(){
      this.previouslyCalledMethod('setLibraryHandler');
    },
    create(){
      this.previouslyCalledMethod('create');
    },
    delete(){
      this.previouslyCalledMethod('delete');
    },
    getAttr(attr){
      this.previouslyCalledMethod('getAttr');
      return {
        "id": 0,
        "email": "abc@yahoo.sample.com",
        "name": "Sample repo 1",
        "public": true,
        "paradigms": [
          {
            "pdid": 1,
            "name": "Object-oriented",
            "details": "Object-oriented programming (OOP) is a programming paradigm based on the concept of \"objects\"",
            "subparadigms": [
              2,
              3
            ]
          },
          {
            "pdid": 2,
            "name": "Actor-based",
            "details": "The actor model in computer science is a mathematical model of concurrent computation that treats \"actors\" as the universal primitives of concurrent computation",
            "subparadigms": []
          },
          {
            "pdid": 3,
            "name": "Class-based",
            "details": "a style of object-oriented programming (OOP) in which inheritance is achieved by defining classes of objects",
            "subparadigms": []
          }
        ],
        "programminglanguages": [
          {
            "plid": 1,
            "name": "Java",
            "details": "Java is a general-purpose computer programming language that is concurrent, class-based, object-oriented,and specifically designed to have as few implementation dependencies as possible",
            "type": "compiled"
          },
          {
            "plid": 2,
            "name": "Javascript",
            "details": "a high-level, dynamic, untyped, and interpreted programming language",
            "type": "interpreted"
          }
        ],
        "havings": [
          {
            "pdid": 1,
            "plid": 1
          },
          {
            "pdid": 1,
            "plid": 2
          }
        ]
      }[attr];
    },
    addPL(){
      this.previouslyCalledMethod('addPL')
    },
    editPL(){
      this.previouslyCalledMethod('editPL')
    },
    getPL(){
      this.previouslyCalledMethod('getPL')
    },
    deletePL(){
      this.previouslyCalledMethod('deletePL')
    },
    getRelatedPDs(){
      this.previouslyCalledMethod('getRelatedPDs')
    },
    getPDID(){
      this.previouslyCalledMethod('getPDID')
    },
    addPD(){
      this.previouslyCalledMethod('addPD')
    },
    editPD(){
      this.previouslyCalledMethod('editPD')
    },
    getPD(){
      this.previouslyCalledMethod('getPD')
    },
    deletePD(){
      this.previouslyCalledMethod('deletePD')
    },
    libraryIsAvailable: true
  };
}

export {getMockLibraryManager, getMockLibraryManagerWithData};