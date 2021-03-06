loadAPI(7);

const LOWEST_CC = 1;
const HIGHEST_CC = 119;

host.setShouldFailOnDeprecatedUse(true);

host.defineController("Keith McMillen", "QuNexus", "0.1", "a535d5ee-82ac-429a-9517-67f82048e02d", "terminal_static");

host.defineMidiPorts(1, 1);

//host.addDeviceNameBasedDiscoveryPair(["QuNexus"], ["QuNexus"]);

function init() {

   noteIn = host.getMidiInPort(0).createNoteInput("", "??????");
   noteIn.setShouldConsumeEvents(false);

   host.getMidiInPort(0).setMidiCallback(onMidi0);
   userControls = host.createUserControls(HIGHEST_CC - LOWEST_CC + 1);
   for (let i = LOWEST_CC; i <= HIGHEST_CC; i++) {
      userControls.getControl(i - LOWEST_CC).setLabel("CC" + i);
   }

   println("qunexus initialized!");
}

function onMidi0(status, data1, data2) {
   //printMidi(status, data1, data2)
   if (isChannelController(status)) {
      if (data1 >= LOWEST_CC && data1 <= HIGHEST_CC) {
         let index = data1 - LOWEST_CC;
         userControls.getControl(index).set(data2, 128);
      }
   }
}

function flush() {}

function exit() {

}