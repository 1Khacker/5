module.exports = async (client, thread) => {
    if(thread.joinable){
        try{
            await thread.join();
        }catch (e){
            console.log(e)
        }
    }
}
/**
  * @INFO
  * https://discord.gg/auxo
  * @INFO
  * Work for Milrato Development | Plaxhup#0796
  * @INFO
  * https://discord.gg/auxo
  * @INFO
*/
