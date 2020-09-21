var setBanner = function(message)
{d3.select("#banner")
    .text(message);
            }
 
var quizMean = function(penguin)
{   var getQuizGrades = function(quiz)
        {return quiz.grade}
    var quizGrades= penguin.quizes.map (getQuizGrades)
   var quizMean = d3.mean(quizGrades)
    return quizMean
}

 var hwMean = function(penguin)
{   var getHwGrades = function(homework)
        {return homework.grade}
    var HwGrades= penguin.homework.map (getHwGrades)
   var hwMean = d3.mean(HwGrades)
    return hwMean
}

 var testMean = function(penguin)
{   var getTestGrades = function(test)
        {return test.grade}
    var testGrades= penguin.test.map (getTestGrades)
   var testMean = d3.mean(testGrades)
    return testMean
}
 
var finalGrade = function(penguin)
    {var getFinalGrade = function(final)
        {return final.grade}
    var finalG= penguin.final.map(getFinalGrade)
    return finalG
}
 
 
var drawTable = function(penguins)
{
  
    var rows =
    d3.select("table tbody")
    .selectAll ("tr")
    .data(penguins)
    .enter()
    .append ("tr")
    
    rows.append("td")
        .append("img")
    .attr("src", function (penguin)
         {return "imgs/"+penguin.picture});
    
    rows.append("td")
    .text(quizMean);
    
     rows.append("td")
    .text(hwMean);
    
     rows.append("td")
    .text(testMean);
    
     rows.append("td")
    .text(finalGrade);
   
}

var penguinPromise = d3.json("classData.json");

var successFCN = function(penguins)
{
    console.log ("penguins", penguins);
    setBanner ("Here's the Penguins!");
    drawTable(penguins);
    sortOnHwMean(penguinPromise);
}

var failureFCN = function(error)
{
    console.log ("error", error);
    setBanner("Penguins not Found");
}


penguinPromise.then (successFCN,failureFCN);

var compareHw = function (penguin1, penguin2)
{   var homeworkArray1 = penguin1.homework.map(getHwGrades)
    var hw1 = d3.mean (homeworkArray1)
    var homeworkArray2 = penguin2.homework.map(getHwGrades)
    var hw2 = d3.mean (homeworkArray2)
    if (hw1 == hw2)
        {return 0}
    else if (hw1 > hw2)
        {return -1}
    else {return 1}

}


var sortOnHwMean = function(penguinPromise)
{   d3. select ("#homeworkmean")
    .on ("click", function() 
      {penguinPromise.sort(compareHw)
      console.log("clicked")
    d3.select ("table tbody")
       .selectAll ("*")
       .remove()
       drawTable(penguinPromise) })

}


