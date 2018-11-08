<div id="custom-modal-wrapper" class="hidden" style="position: fixed; left: 0; right: 0; top: 0; bottom: 0; z-index: 5000;">

  <div id="modalBackdrop" class="backdrop-default" style="z-index: 5500; position: absolute; left: 0; right: 0; bottom: 0; top: 0; margin: 0; background: rgb(0, 0, 0); opacity: 0.8; top: 0; height: 100%; width: 100%;"></div>

  <div id="modalContent" class="modal-default" style="z-index: 6000; position: absolute; top: 156px; left: 0px; display: block;">
    <div class="ctools-modal-content">
      <span class="popups-close"><a class="close" href="#">×</a></span>

      <div class="modal-scroll">
        <div id="modal-content" class="modal-content popups-body">
          <h1><a href="#"><?=$title; ?></a></h1>

          <?php print render($content['body']); ?>
        </div>
      </div>
    </div>
  </div>
</div>

<script>
  // Document ready
  document.addEventListener('DOMContentLoaded', function(event) {
    var modal = document.querySelector('#custom-modal-wrapper');
    var modalClose = document.querySelector('#custom-modal-wrapper .close');

    var currentNodeId = <?=$nid?>;
    var modalIds = Cookies.getJSON('modal') || [];
    var isAlreadySeen = modalIds.some(function (modalId) {
      return modalId === currentNodeId;
    });

    if (! isAlreadySeen) {

      // Push the new ID on to the array.
      modalIds.push(currentNodeId);

      // Set the IDs inside a new cookie.
      Cookies.set('modal', modalIds, { expires: 3 });

      // Remove the .hidden class, so the modal becomes visible.
      modal.classList.remove('hidden');
    }

    // Modal close.
    modalClose.addEventListener('click', function(event) {
      modal.classList.add('hidden');
    });
  });
</script>
