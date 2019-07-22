var button = document.getElementById('more');

var candidates = document.getElementById('candidates');
console.log(candidates)


button.onclick = function(){
    var candidates = document.getElementById('candidates');
    console.log(candidates)

    var input = document.createElement('input');
    input.className = ['form-control candidates'];
    input.type = "text";
    input.name = "candidates";
    input.placeholder = '';
    // candidates.appendChild(document.createElement('br'));
    candidates.appendChild(input) 
}


// type="candidates" class="form-control candidates"  name="candidates" placeholder="Candidate"