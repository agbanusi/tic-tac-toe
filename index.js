

let wincombos=[[0,1,2],[0,3,6],[3,4,5,],[6,7,8],[1,4,7],[2,4,6],[2,5,8],[0,4,8]]

let p=[0,1,2,3,4,5,6,7,8]

class Main1 extends React.Component{
  constructor(props){
    super(props);
    this.doubleUpdate=this.doubleUpdate.bind(this)
  }
  doubleUpdate(num){
    num==1? update('type',true):update('type',false)
    update1(num)
    update2(1)
  }
  render(){
    return(
      <div className='first'>
      <h3> How do you want to play?</h3>
      <div>
      <button className='ch' onClick={()=>this.doubleUpdate(1)}>One Player</button>
      <button className='ch' onClick={()=>this.doubleUpdate(2)}>Two Players</button>
      </div>
      </div>
    )
  }
}

function update1(text){
  this.setState({players:text})
}
class Main2 extends React.Component{
  constructor(props){
    super(props);
    this.state={
      players:1
    }
    this.back=this.back.bind(this)
    update1=update1.bind(this)
    this.double=this.double.bind(this)
  }
  back(){
    update2(0)
  }
  double(txt){
    update('player1',txt);
    update2(2)
  }
  render(){
    if (this.state.players==1){
      var text='Would you like to be X or O?'
    }
    else{
      var text='Player1: Would you like to be X or O?'
    }
    return(
      <div className='second'>
      <h3>{text}</h3>
      <div>
      <button className='bound' onClick={()=>this.double('X')}>X</button>
      <button className='bound' onClick={()=>this.double('O')}>O</button>
      </div>
      <button onClick={this.back}>Back</button>
      </div>
    );
  }
}
var turn=false
function update(player,text){
  this.setState({[player]:text})
}
var state={
      0:'',1:'',2:'',3:'',4:'',
      5:'',6:'',7:'',8:'',play:true,
      player1:'',player2:'',text:'',
      comp:'',score1:0,score2:0,type:true,
      array1:[],array2:[],array:[[],[]] 
    }
class Main3 extends React.Component {
  constructor(props){
    super(props);
    this.state={
      0:'',1:'',2:'',3:'',4:'',
      5:'',6:'',7:'',8:'',play:true,
      player1:'',player2:'',text:'',
      comp:'',score1:0,score2:0,type:true,
      array1:[],array2:[],array:[[],[]] 
    }
    this.change=this.change.bind(this);
    update=update.bind(this);
    this.win=this.win.bind(this)
    this.copy=this.copy.bind(this);
    this.kick=this.kick.bind(this);
    this.tie=this.tie.bind(this)
    this.play=this.play.bind(this)
    this.score=this.score.bind(this)
    this.minimax=this.minimax.bind(this)
    this.ai=this.ai.bind(this)
  }
  
  copy(board){
    return [...board]
  }
  
  kick(){
    let board=p.map((j,ind)=>state[ind])
    for (let i=0;i<wincombos.length;i++){
      if(wincombos[i].filter(l=>board[l]==state.player2).length==2 && wincombos[i].filter(p=>board[p]=='').length>0){
        return wincombos[i].filter(pp=>board[pp]=='')[0]
      }
      else if(wincombos[i].filter(n=>board[n]==state.player1).length==2 && wincombos[i].filter(m=>board[m]=='').length>0){
        return wincombos[i].filter(m=>board[m]=='')[0]
      }
    }
    return false
  }
  score(board, player,depth) {
   if (
     (board[0] == player && board[1] == player && board[2] == player) ||
     (board[3] == player && board[4] == player && board[5] == player) ||
     (board[6] == player && board[7] == player && board[8] == player) ||
     (board[0] == player && board[3] == player && board[6] == player) ||
     (board[1] == player && board[4] == player && board[7] == player) ||
     (board[2] == player && board[5] == player && board[8] == player) ||
     (board[0] == player && board[4] == player && board[8] == player) ||
     (board[2] == player && board[4] == player && board[6] == player)
     ) 
   {

     if(player=state.player2) { 
       return 10-depth;
     }
     else{ 
         return -10+depth;
       }
   }
   else if(board.filter(i=>i=='').length==0 ){return 0}
   else{return null}
  }
  ai(e){
    let board=p.map((j,ind)=>state[ind])
    let arr=state.array
    let m=state.player2
    let ini=[0,2,6,8];
    if(board.every((j)=>j=='')){
      return ini[Math.floor(Math.random()*4)]
    }
    else if(board.filter((j)=>j!='').length==1){
      if(board[4]==''){return 4}
      else{return this.minimax(e,board,arr,0,m).index}
    }
    else if(this.kick()){
      //console.log('done')
      return this.kick()
    }
    
    else{
      return this.minimax(e,board,arr,0,m).index
    }
  }
  minimax(e,nboard,arr,depth,m){
    let max=state.player2
    let min=state.player1
    if(this.score(nboard,m,depth)!==null){return {score :this.score(nboard,m,depth)}}
    else{
    depth+=1
    let moves=[]
    let seed=[]
    for(let i=0;i<nboard.length;i++){if(nboard[i]==''){seed.push(i)}}
    for (let ii=0;ii<seed.length;ii++){
      let mboard=this.copy(nboard)
      var move={}
      move.index=seed[ii]
      mboard[seed[ii]]=m
      if (m==max){
        var res=this.minimax(e,mboard,arr,depth,min)
        move.score=res.score
        
      }
      else{
        var res=this.minimax(e,mboard,arr,depth,max)
        move.score=res.score
      }
      seed[ii]=move.index;
      moves.push(move)
    }
    var best
    if(m==min){
      var bestsc= -100000
      for(var k = 0; k < moves.length; k++){
        if(moves[k].score > bestsc){
          bestsc = moves[k].score;
          best = k;
        }
      }
    }
    else{
      var bestScore2 = 10000;
      for(var l = 0; l < moves.length; l++){
        if(moves[l].score < bestScore2){
          bestScore2 = moves[l].score;
          best = l;
        }
      }
    }
    return moves[best];
    }
  }
  
  change(e,max){
    let ide=max || max==0? max: e.target.id
    var res
    let board=p.map((j,ind)=>state[ind])
    if(state[ide]===''){
      if(state.play===true){
        state[ide]=state.player1
        res= [[...this.state.array[0],Number(ide)],[...this.state.array[1]]]
        this.setState({[ide]:this.state.player1, array1:this.state.array1.concat(ide),array:[[...this.state.array[0],Number(ide)],[...this.state.array[1]]]})
        this.setState({play:!this.state.play})
        state[ide]=state.player1;state.array1=state.array1.concat(Number(ide));state.array=[[...state.array[0],Number(ide)],[...state.array[1]]];state.play=!state.play
      }
      else{
        state[ide]=state.player2
        res= [[...this.state.array[0]],[...this.state.array[1],Number(ide)]]
        this.setState({[ide]:this.state.player2, array2:this.state.array2.concat(ide),array:[[...this.state.array[0]],[...this.state.array[1],Number(ide)]]})
        this.setState({play:!this.state.play})
        state[ide]=state.player2;state.array2=state.array2.concat(Number(ide));state.array=[[...state.array[0]],[...state.array[1],Number(ide)]];state.play=!state.play
      }
    }
  }
  tie(){
    let board=p.map((j,ind)=>state[ind])
    if(board.filter(i=>i=='').length==0 && !this.win()){
        state.array1=[];state.array2=[];state.array=[[],[]];state.text='It was a draw!'
        p.map((i,j)=>{state[j]=''})
      return true
      }
      else{return false}
  }
  win(){
    let arr=state.array
    for(let q=0;q<wincombos.length;q++){
          if(wincombos[q].every((j)=>arr[0].includes(j))){
             wincombos[q].map((i)=>{
              let to=document.getElementById(i)
              to.classList.add('win')
             })
             setTimeout(()=>{arr[0].map((i)=>{
                let too=document.getElementById(i)
                too.classList.remove('win')})
                },50)
                state.array1=[];state.array2=[];state.score1+=1;state.array=[[],[]];state.text='Player 1 won!';p.map((i,j)=>{state[j]=''})
              return true
              }
          else if(wincombos[q].every((j)=>arr[1].includes(j))){
              wincombos[q].map((i)=>{
                let to=document.getElementById(i)
               to.classList.add('win')
             })
             setTimeout(()=>{arr[1].map((i)=>{
                let too=document.getElementById(i)
                too.classList.remove('win')})
                },50)
                state.array1=[];state.array2=[];state.score2+=1;state.array=[[],[]];state.text=this.state.type?'Computer won!':'Player 2 won!';p.map((i,j)=>{state[j]=''})
              return true
              }
    }
    return false; 
  }
  
  play(e){
    let board=p.map((j,ind)=>state[ind])
    let arr=this.state.array
    state.text=''
    state.player1=this.state.player1
    state.player2=this.state.player1=='X'?'O':'X'
    var par=0
    if(board[e.target.id]==''){
      if(this.state.type && state.play==true){
          this.change(e)
          this.win()
          this.tie()
          if(!this.win() && !this.tie()){
            let max=this.ai(e)
            this.change(e,max)
            this.win()
            this.tie()
          }
      }
      else{
        this.change(e)
        this.win()
        this.tie()
        
      }
    }
  }
  render() {
    var boarde=p.map((j,ind)=>this.state[ind])
    return (
      <div className='gamer'>
      <div className='text'>{state.text}</div>
      <div className='score'><div>Player1- {state.score1}</div> <div>{this.state.type? 'Computer-'+ state.score2: 'Player2-'+state.score2}</div></div>
      <div className='game'>
      {p.map((i,j)=>{
      return <div className='tile' key={j} id={j} onClick={(e)=>this.play(e)}>{state[j]}</div>
      })}
      </div>
      </div>
    );
  }
}

function update2(no) {
    this.setState({st:no })
}
class Main extends React.Component {
  constructor(props){
    super(props);
    this.state={
      st:0
    }
    update2=update2.bind(this);
    this.two=this.two.bind(this)
  }
  two(){
    state={
      0:'',1:'',2:'',3:'',4:'',
      5:'',6:'',7:'',8:'',play:true,
      player1:'',player2:'',text:'',
      comp:'',score1:0,score2:0,type:true,
      array1:[],array2:[],array:[[],[]] 
    }
    update2(0)
  }
  render(){
    //console.log(this.state.st)
    if(this.state.st==0){
      var one={display:'block'}
      var two={display: 'none'}
      var three={display :'none'}
    }
    else if(this.state.st==1){
      var two={display:'block'}
      var one={display: 'none'}
      var three={display :'none'}
    }
    else{
      var three={display:'block'}
      var two={display: 'none'}
      var one={display :'none'}
    }
    return(
    <div className='root'>
      <div className='reset' onClick={this.two}> Reset All</div>
      <div className='comp'>
      <div style={one}><Main1 /></div>
      <div style={two}><Main2 /></div>
      <div style={three}><Main3 /></div>
      </div>
    </div>
    )
  }
}


ReactDOM.render(<Main />, document.getElementById('root'));
