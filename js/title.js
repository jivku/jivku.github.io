
document.addEventListener("DOMContentLoaded", function() {
    const originalTitle = document.title; 
    const animatedTitles = ["wow", ":3", "ニガー","ヴァルツ","ඞ", "˗ˏˋ ´ˎ˗"];
    let index = 0;

    setInterval(() => {
        
        document.title = animatedTitles[index];
        index = (index + 1) % animatedTitles.length; 
    }, 200); 
});